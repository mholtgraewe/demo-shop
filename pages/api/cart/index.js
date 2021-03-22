import { getCart } from '../../../lib/api';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const cart = await getCart(req, res);

  res.status(200).json(cart);
}