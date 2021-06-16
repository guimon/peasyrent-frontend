import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Divider } from '@material-ui/core';
import { Topbar, Footer, Sidebar } from './components';
import AuthService from "../../services/AuthService";
import RouteConstants from "../../RouteConstants";
import {useHistory} from "react-router-dom";
import {subPages as dasboardSubPages} from "../../views/Dashboard/Dashboard";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundColor: theme.palette.alternate.main,
  },
  autoExpandable: {
    flex: 1,
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const getPages = () => {
    return [
      {
        title: 'Account',
        id: 'account',
        pages: [
          {
            title: AuthService.loggedIn() ? 'Logout' : 'Login',
            href: AuthService.loggedIn() ? undefined : RouteConstants.login,
            onClick: AuthService.loggedIn() ? () => { AuthService.logout(); history.push(RouteConstants.root); } : undefined,
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
      {
        title: 'Product',
        id: 'product',
        pages: dasboardSubPages,
      },
      {
        title: 'Company',
        id: 'company',
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
    ]
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
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
      />
      <Divider />
      <main className={classes.autoExpandable}>
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
