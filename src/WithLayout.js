import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from './theme';

import AOS from 'aos';

export default function WithLayout({ component: Component, layout: Layout, ...rest }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <ThemeProvider theme={getTheme()}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Paper elevation={0}>
        <Layout>
          <Component {...rest} />
        </Layout>
      </Paper>
    </ThemeProvider>
  );
}