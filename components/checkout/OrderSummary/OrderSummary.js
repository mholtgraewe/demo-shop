import {
  makeStyles,
  useTheme,
  useMediaQuery,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { toCurrency } from '../../../lib/utils';
import { useCartContext } from '../../../lib/contexts/CartContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  smallPrint: {
    fontSize: theme.typography.fontSize * 0.8,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  prevButton: {
    order: 2,
  },
  nextButton: {
    order: 1,
  },
  [theme.breakpoints.up('sm')]: {
    prevButton: {
      order: 1,
    },
    nextButton: {
      order: 2,
    },
  },
}));

export default function OrderSummary({ handleSubmit }) {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const { isLoading, items } = useCartContext();

  const total = items.reduce((sum, item) => (
    sum + (item.price * item.quantity)
  ), 0);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>Details</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box fontStyle="italic" my={2} color="text.secondary">
                    <Typography fontStyle="oblique">
                      {isLoading ? 'Loading...' : 'Your cart is empty'}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {items.map(item => (
              <TableRow key={item.productId}>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  {item.quantity}
                </TableCell>
                <TableCell align="right">
                  {toCurrency(item.price)}
                </TableCell>
                <TableCell align="right">
                  {toCurrency(item.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} />
              <TableCell>Total*</TableCell>
              <TableCell align="right">{toCurrency(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography className={classes.smallPrint}>
        * Excl. VAT and shipping costs
      </Typography>

      <Box mt={4}>
        <Grid container justify="space-between" spacing={2}>
          <Grid
            item
            xs={12} sm={6}
            className={classes.prevButton}
          >
            <Link href="/" passHref>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                aria-label="Continue shopping"
                fullWidth={!isWideScreen}
              >
                Continue shopping
              </Button>
            </Link>
          </Grid>

          <Grid
            item
            xs={12} sm={6}
            className={classes.nextButton}
            align="right"
          >
            <Button
              variant="outlined"
              color="secondary"
              aria-label="Continue checkout process"
              disabled={items.length === 0}
              fullWidth={!isWideScreen}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}