import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { findProducts, getCategoryOptions, getSortOptions } from '../lib/api';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';

const PRODUCTS_PER_PAGE = 6;

const useStyles = makeStyles(theme => ({
  productFilter: {
    padding: theme.spacing(2),
  },
  productList: {
    padding: theme.spacing(0, 2, 4, 2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 2, 4, 0),
    },
  },
}));

export default function Home(props) {
  const { products, pagination, categoryOptions, sortOptions } = props;
  const classes = useStyles();
  const router = useRouter();

  const handlePageChange = (event, page) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  return (
    <Layout>
      <Grid container>
        <Grid item lg={2} />

        <Grid item container xs={12} lg={8}>
          <Grid className={classes.productFilter} item xs={12} md={3}>
            <ProductFilter
              categoryOptions={categoryOptions}
              sortOptions={sortOptions}
            />
          </Grid>

          <Grid item container xs={12} md={9} justify="center">
            <Grid item xs={12} className={classes.productList}>
              {products.length > 0 ? (
                <ProductList products={products} />
              ) : (
                <Typography>
                  There are no products that match "<b>{router.query.term}</b>"
                </Typography>
              )}
            </Grid>

            {(pagination.numPages > 1) && (
              <Grid item>
                <Pagination
                  count={pagination.numPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  shape="rounded"
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item lg={2} />
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  const searchParams = {
    page: parseInt(query.page, 10) || 1,
    term: (query.term ?? '').trim(),
    pageSize: PRODUCTS_PER_PAGE,
    sortBy: query.sort,
    category: query.cat,
  };

  try {
    const [
      [numFound, products],
      categoryOptions,
      sortOptions,
    ] = await Promise.all([
      findProducts(searchParams),
      getCategoryOptions(),
      getSortOptions(),
    ]);

    const { min, max, ceil } = Math;
    const pagination = {};
    pagination.numPages = max(ceil(numFound / PRODUCTS_PER_PAGE), 1);
    pagination.page = min(max(searchParams.page, 1), pagination.numPages);

    return {
      props: {
        products,
        pagination,
        categoryOptions,
        sortOptions,
       },
    };
  } catch (error) {
    return { props: { error } };
  }
}
