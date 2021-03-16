import React from 'react'
import { useLocation } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import TopBar from "./TopBar";
import Footer from "./Footer";
import NavigationMenuHelper from "../helpers/NavigationMenuHelper";
import Routes from "../Routes";
import AuthService from "../services/AuthService";

function MainContainer(props) {
  const {children} = props;
  const location = useLocation();

  return (
    <Grid container direction="column" style={{minHeight: '100vh'}}>
      <TopBar loggedIn={AuthService.loggedIn()} bigLogo={NavigationMenuHelper.isSamePath(Routes.root, location)} />
      {children}
      <Footer />
    </Grid>
  )
}

export default MainContainer;
