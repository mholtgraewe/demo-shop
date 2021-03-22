import {
  makeStyles,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { getAllProducts, getProductBySlug } from '../../lib/api';
import { toImageUrl, toCurrency } from '../../lib/utils';
import { useState } from 'react';
import { useCartContext } from '../../lib/contexts/CartContext';
import { useUiContext } from '../../lib/contexts/UiContext';
import { NextSeo } from 'next-seo';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.common.white,
    maxHeight: '70vh',
    padding: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(4),
    },
  },
  infoContainer: {
    padding: theme.spacing(3, 4, 0, 4),
  },
  buttonWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: 'auto',
  },
  buttonProgress: {
    color: theme.palette.secondary.light,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Product({ product }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartContext();
  const { openDrawer } = useUiContext();

  const handleClick = async () => {
    setIsLoading(true);
    await addItem(product.id);
    openDrawer();
    setIsLoading(false);
  };

  return (
    <Layout>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: toImageUrl(product.image.url),
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />

      <Grid container>
        <Grid item lg={2} />

        <Grid item container xs={12} lg={8}>
          <Grid item xs={12} md={6} className={classes.imageContainer}>
            <Image
              src={toImageUrl(product.image.url)}
              alt={product.name}
              width={product.image.width}
              height={product.image.height}
              objectFit="contain"
            />
          </Grid>

          <Grid item xs={12} md={6} className={classes.infoContainer}>
            <Typography variant="overline" color="textSecondary">
              {product.categories?.[0].name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom paragraph>
              {toCurrency(product.price)}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="secondary"
                aria-label="add to cart"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleClick}
                disabled={isLoading}
              >
                Add to cart
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>

        <Grid item lg={2} />
      </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();
  const paths = products.map(product => `/products/${product.slug}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug);
  return { props: { product } };
}
