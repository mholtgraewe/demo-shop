import { useEffect } from 'react';
import Error from 'next/error';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from '../components/theme';
import { UiProvider } from '../lib/contexts/UiContext';
import { CartProvider } from '../lib/contexts/CartContext';
import { DefaultSeo } from 'next-seo';
import Seo from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Show an error page if server side data fetching failed
  if (pageProps.error) {
    const { code, message } = pageProps.error;
    return <Error statusCode={code} title={message} />;
  }

  return (
    <>
      <DefaultSeo {...Seo} />

      <ThemeProvider theme={theme}>
        <UiProvider>
          <CartProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </CartProvider>
        </UiProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
