import React from 'react';
import clsx from 'clsx';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import {Box, List, ListItem, Grid, Typography, Hidden} from '@material-ui/core';
import { SectionAlternate, CardBase } from '../../components/organisms';
import Hero from './Hero';
import useEnsuredLoggedInUser from "../../hooks/useEnsuredLoggedInUser";
import RouteConstants from "../../RouteConstants";
import AuthService from "../../services/AuthService";
import {useHistory} from "react-router-dom";
import MessageLeasePicker from "./components/MessageLeasePicker"
import LeasesStore from "../../stores/LeasesStore";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

export const subPages = [
  {
    id: 'dashboard',
    group: 'dashboard',
    href: RouteConstants.renterDashboard,
    title: 'Dashboard',
  },
  {
    id: 'payment-methods',
    group: 'payment-methods',
    href: RouteConstants.paymentMethods,
    title: 'Payment methods',
  },
  {
    id: 'messages',
    group: 'messages',
    href: RouteConstants.renterMessages,
    title: 'Messages',
  },
];

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Box component="div" hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  );
};


const RenterDashboard = (props = {}) => {
  useEnsuredLoggedInUser();
  const classes = useStyles();
  const history = useHistory();
  let pageId = parse(window.location.search).pid || 'dashboard';
  let groupId = parse(window.location.search).gid || pageId;

  const logout = () => {
    AuthService.logout();
    history.push(RouteConstants.root);
  };

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <CardBase withShadow align="left" className={classes.menu}>
                <List disablePadding className={classes.list}>
                  {subPages.map((item, index) => (
                    <ListItem
                      button
                      onClick={() => history.push(item.href)}
                      key={index}
                      className={clsx(
                        classes.listItem,
                        groupId === item.id ? classes.listItemActive : {},
                      )}
                      disableGutters
                    >
                      <Typography
                        variant="subtitle1"
                        noWrap
                        color="textSecondary"
                        className="menu__item"
                      >
                        {item.title}
                      </Typography>
                    </ListItem>
                  ))}
                  <ListItem
                    key={"logout"}
                    className={classes.listItem}
                    button
                    onClick={logout}
                    disableGutters
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color="textSecondary"
                      className="menu__item"
                    >
                      Logout
                    </Typography>
                  </ListItem>
                </List>
              </CardBase>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9}>
            <CardBase withShadow align="left">
              <TabPanel value={pageId} index={'dashboard'}>
               Renter dashboard
              </TabPanel>
              <TabPanel value={pageId} index={'messages'}>
                <LeasesStore>
                  <MessageLeasePicker />
                </LeasesStore>
              </TabPanel>
              <TabPanel value={pageId} index={'payment_methods'}>
                Payment methods
              </TabPanel>

            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default RenterDashboard;
