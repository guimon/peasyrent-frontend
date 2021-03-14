import React, {useState} from 'react'
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from "@material-ui/core/AppBar";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Hidden} from "@material-ui/core";

import Routes from "../constants/Routes";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  smallLogo: {
    height: 40,
  },
  drawerListIcon: {
    minWidth: 32,
  },
  drawerListIconSelected: {
    minWidth: 32,
    color: '#fff',
  },
  drawerListItemSelected: {
    backgroundColor: theme.palette.primary.light,
  }
}));


function TopBar(props){
  const {loggedIn} = props;
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" color='default' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div>
          <RouterLink to={Routes.root}>
            <img className={classes.smallLogo} src="/logo-text.png" alt={"logo"}/>
          </RouterLink>
        </div>
        {loggedIn &&
          <Hidden smUp>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer()}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        }

        <MenuDrawer open={drawerOpen} closeCallback={toggleDrawer}/>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar;
