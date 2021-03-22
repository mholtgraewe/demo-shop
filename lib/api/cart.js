import ajax from './ajax';
import Cookies from 'cookies';
import { getProductById } from './products';

function sanitize(cart) {
  return {
    id: cart.id,
    items: cart?.items ?? [],
  };
}

async function getCartById(id) {
  return await ajax({ url: `/carts/${encodeURIComponent(id)}` });
}

async function createEmptyCart() {
  return ajax({
    method: 'POST',
    url: '/carts',
    data: {
      items: [],
    },
  });
}

async function updateCart(id, data) {
  return await ajax({
    url: `/carts/${encodeURIComponent(id)}`,
    method: 'PUT',
    data,
  });
}

export async function getCart(req, res) {
  const cookies = new Cookies(req, res);

  const cartId = cookies.get('cartId');
  if (cartId) {
    try {
      return sanitize(await getCartById(cartId));
    } catch (error) {
      if (error.code !== 404) {
        throw error;
      }
    }
  }

  // If we're here then the cart does not exist.
  // TODO: Make sure that cart.id is a non-sequential UUID!
  const cart = await createEmptyCart();
  cookies.set('cartId', cart.id);
  return sanitize(cart);
}

export async function updateCartItem(req, res, { productId, quantity }) {
  const cart = await getCart(req, res);

  let items = cart.items;
  const foundItem = items.find(item => item.productId === productId);
  if (foundItem) {
    items = items.map(item => (
      item.productId === foundItem.productId
        ? { ...item, quantity }
        : item
    ));
  } else if (quantity > 0) {
    const product = await getProductById(productId);
    items = [
      ...items,
      {
        productId,
        quantity,
        slug: product.slug,
        name: product.name,
        price: product.price,
        thumbnail: product?.image?.formats?.thumbnail?.url,
      },
    ];
  }

  items = items.filter(item => item.quantity > 0);

  return sanitize(await updateCart(cart.id, { items }));
}
