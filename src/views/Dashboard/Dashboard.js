import React from 'react';
import clsx from 'clsx';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Typography } from '@material-ui/core';
import { SectionAlternate, CardBase } from '../../components/organisms';
import { Hero, Properties } from './components';
import Uploader from "../../components/Uploader";
import useEnsuredLoggedInUser from "../../hooks/useEnsuredLoggedInUser";

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
    overflow: 'auto',
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

const subPages = [
  {
    id: 'dashboard',
    href: '/dashboard',
    title: 'Dashboard',
  },
  {
    id: 'properties',
    href: '/dashboard/?pid=properties',
    title: 'Properties',
  },
  {
    id: 'maintenance',
    href: '/dashboard/?pid=maintenance',
    title: 'Maintenance',
  },
  {
    id: 'billing',
    href: '/dashboard/?pid=billing',
    title: 'Billing',
  },
  {
    id: 'leases',
    href: '/dashboard/?pid=leases',
    title: 'Leases',
  },
  {
    id: 'renters',
    href: '/dashboard/?pid=renters',
    title: 'Renters',
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

const Dashboard = (props = {}) => {
  useEnsuredLoggedInUser();
  const classes = useStyles();
  let pageId = parse(window.location.search).pid || 'dashboard';

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardBase withShadow align="left" className={classes.menu}>
              <List disablePadding className={classes.list}>
                {subPages.map((item, index) => (
                  <ListItem
                    key={index}
                    component={'a'}
                    href={item.href}
                    className={clsx(
                      classes.listItem,
                      pageId === item.id ? classes.listItemActive : {},
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
              </List>
            </CardBase>
          </Grid>
          <Grid item xs={12} md={9}>
            <CardBase withShadow align="left">
              <TabPanel value={pageId} index={'dashboard'}>
                Open maintenance requests...
                <br/>
                Late payments...
                <br/>
                Ending leases...
                <Uploader/>
              </TabPanel>
              <TabPanel value={pageId} index={'properties'}>
                <Properties />
              </TabPanel>
              <TabPanel value={pageId} index={'maintenance'}>
                "maintenance"
              </TabPanel>
              <TabPanel value={pageId} index={'billing'}>
                "billing"
              </TabPanel>
              <TabPanel value={pageId} index={'leases'}>
                "leases"
              </TabPanel>
              <TabPanel value={pageId} index={'renters'}>
                "renters"
              </TabPanel>
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default Dashboard;
