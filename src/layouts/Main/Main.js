import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Divider } from '@material-ui/core';
import { Topbar, Footer, Sidebar } from './components';
import AuthService from "../../services/AuthService";
import RouteConstants from "../../RouteConstants";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  autoExpandable: {
    flex: 1,
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const getPages = () => {
    return {
      pages: {
        title: 'Pages',
        id: 'supported-old_pages',
        children: {
          company: {
            groupTitle: 'Company',
            pages: [
              {
                title: 'Terms and Conditions',
                href: RouteConstants.terms,
              },
              {
                title: 'Contact Us',
                href: RouteConstants.contact,
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
                title: AuthService.loggedIn() ? 'Logout' : 'Login',
                href: AuthService.loggedIn() ? RouteConstants.logout : RouteConstants.login,
              },
              {
                title: 'Sign up',
                href: RouteConstants.signup,
              },
              {
                title: 'Reset your password',
                href: RouteConstants.resetPassword,
              },
            ],
          },
        },
      },
    };
  };

  const [openSidebar, setOpenSidebar] = useState(false);
  const [pages, setPages] = useState(getPages());

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
    setPages(getPages());
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
      <main className={classes.autoExpandable}>
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
