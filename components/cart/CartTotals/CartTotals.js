import { Typography, Grid, Divider, Box } from '@material-ui/core';
import { useCartContext } from '../../../lib/contexts/CartContext';
import { toCurrency } from '../../../lib/utils';

export default function CartTotals() {
  const { items } = useCartContext();

  const subtotal = items.reduce((sum, item) => (
    sum + (item.price * item.quantity)
  ), 0);

  // This is just a demo, we don't actually calculate taxes or shipping
  const total = subtotal;

  return (
    <Grid container direction="column">
      <Grid item><Box py={1}><Divider /></Box></Grid>

      <Grid item>
        <Typography variant="body1">
          Shipping calculated at checkout
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1">
          Tax calculated at checkout
        </Typography>
      </Grid>

      <Grid item container justify="space-between">
        <Grid item>
          <Typography variant="body1">
            Subtotal
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="primary">
            {toCurrency(subtotal)}
          </Typography>
        </Grid>
      </Grid>

      <Grid item><Box py={1}><Divider /></Box></Grid>

      <Grid item container justify="space-between">
        <Grid item>
          <Typography variant="h6" color="textPrimary">
            Total
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="primary">
            {toCurrency(total)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}