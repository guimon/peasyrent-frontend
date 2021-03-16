import React from 'react'

import Grid from '@material-ui/core/Grid';

import TopBarHome from "./TopBarHome";
import Footer from "./Footer";
import AuthService from "../services/AuthService";

function MainContainerHome(props) {
  const {children} = props;

  return (
    <Grid container direction="column" style={{minHeight: '100vh'}}>
      <TopBarHome loggedIn={AuthService.loggedIn()} />
      {children}
      <Footer />
    </Grid>
  )
}

export default MainContainerHome;
