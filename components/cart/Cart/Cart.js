import { useCartContext } from '../../../lib/contexts/CartContext';
import { useUiContext } from '../../../lib/contexts/UiContext';
import CartItem from '../CartItem';
import CartTotals from '../CartTotals';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
  },
}));

export default function Cart() {
  const router = useRouter();
  const classes = useStyles();
  const { closeDrawer } = useUiContext();
  const { items } = useCartContext();

  const goToCheckout = async () => {
    await router.push({
      pathname: '/checkout',
      query: router.query,
    });
    closeDrawer();
  };

  return (
    <Grid container className={classes.root}>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2} mr={1} mb={2} ml={2}
            fontWeight="fontWeightRegular"
           >
            <Typography variant="h6" color="textSecondary">
              YOUR SHOPPING CART
            </Typography>
            <IconButton aria-label="Hide cart" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Grid>
        {items.map(item => (
          <Grid item xs={12} key={item.productId}>
            <Box px={2}>
              <CartItem item={item} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Box px={2} mt={6}>
          <CartTotals />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box mt={8} mb={2} px={2}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            disabled={items.length === 0}
            onClick={goToCheckout}
          >
            Proceed to checkout
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}