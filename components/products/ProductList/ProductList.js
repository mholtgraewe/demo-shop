import { Grid, makeStyles } from '@material-ui/core';
import ProductCard from '../ProductCard';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
  },
}));

export default function ProductList({ products }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center">
      {products.map(product => (
        <Grid
          item
          className={classes.item}
          key={product.id}
          xs={12} sm={6} md={4}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}