import Head from 'next/head';
import Navigation from './common/Navigation';
import Footer from './common/Footer';
import { makeStyles, Drawer } from '@material-ui/core';
import { useUiContext } from '../lib/contexts/UiContext';
import Cart from './cart/Cart';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: '120px',
  },
  paper: {
    background: theme.palette.grey[100],
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const { isDrawerOpen, closeDrawer } = useUiContext();

  return (
    <div className={classes.root}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Navigation />

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        classes={{ paper: classes.paper }}
      >
        <Cart />
      </Drawer>

      <main>{children}</main>

      <Footer />
    </div>
  );
}