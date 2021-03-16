import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Divider } from '@material-ui/core';
import { Topbar, Footer, Sidebar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const pages = {
    pages: {
      title: 'Pages',
      id: 'supported-old_pages',
      children: {
        company: {
          groupTitle: 'Company',
          pages: [
            {
              title: 'Terms and Conditions',
              href: '/company-terms',
            },
            {
              title: 'Contact',
              href: '/contact',
            },
          ],
        },
      },
    },
    account: {
      title: 'Account',
      id: 'account',
      children: {
        account: {
          groupTitle: 'Account',
          pages: [
            {
              title: 'Login',
              href: '/signin',
            },
            {
              title: 'Reset your password',
              href: '/password-reset',
            },
          ],
        },
      },
    },
  };

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} pages={pages} />
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
      />
      <main>
        <Divider />
        {children}
      </main>
      <Footer pages={pages} />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
