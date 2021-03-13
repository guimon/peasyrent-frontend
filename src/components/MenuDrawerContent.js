import React from 'react'
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Routes from "../constants/Routes";

const useStyles = makeStyles({
  drawerListIcon: {
    minWidth: 32,
  },
  drawerListIconSelected: {
    minWidth: 32,
    color: '#fff',
  },
  drawerListItemSelected: {
    backgroundColor: theme => theme.palette.primary.light,
  },
  toolbar: theme => theme.mixins.toolbar,
});

function MenuDrawerContent(){
  const theme = useTheme();
  const classes = useStyles(theme);
  const location = useLocation();
  const history = useHistory();

  const buildListItem = (route, icon, label) => (
    <ListItem button key={`label-${label}`}
              selected={selectedMenu(route)}
              id={`route${route.replace(/\//g, "-")}`}
              onClick={() => menuClick(route)}
              classes={{selected: classes.drawerListItemSelected}}>
      <ListItemIcon className={selectedMenu(route) ? classes.drawerListIconSelected : classes.drawerListIcon}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );

  const menuClick = (route) => {
    history.push(route);
  };

  const selectedMenu = (route) => {
    return location.pathname === route;
  };

  return (
      <List>
        {buildListItem(Routes.dashboard, <DashboardIcon />, 'Dashboard')}
        {buildListItem(Routes.logout, <ExitToAppIcon />, 'Logout')}
      </List>
  )
}

export default MenuDrawerContent;
