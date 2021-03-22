import { updateCartItem } from '../../../lib/api';

const ALLOWED_METHODS = ['POST', 'PUT', 'PATCH'];

export default async function handler(req, res) {
  if (!ALLOWED_METHODS.includes(req.method)) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const productId = req.body?.productId;
  const quantity = parseInt(req.body?.quantity, 10);

  if (!productId || isNaN(quantity)) {
    return res.status(400).json('Bad Request');
  }

  const cart = await updateCartItem(req, res, { productId, quantity });

  res.status(200).json(cart);
}