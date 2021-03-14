import React from 'react'
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";

import Routes from "../constants/Routes";
import Colors from "../constants/Colors";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  bigLogo: {
    height: 50,
  },
}));

const LoginLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to={Routes.login} {...props} />
));

function TopBarHome(props){
  const {loggedIn} = props;
  const classes = useStyles();

  return (
    <AppBar position="sticky" color='default' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div>
          <RouterLink to={Routes.root}>
           <img className={classes.bigLogo} src="/logo-text.png" alt={"logo"}/>
          </RouterLink>
        </div>
        {loggedIn &&
        <Button variant={'contained'} color={'primary'} component={LoginLink}>
          Dashboard
        </Button>
        }
        {!loggedIn &&
        <Button variant={'contained'} color={'primary'} component={LoginLink}>
          Login
        </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default TopBarHome;
