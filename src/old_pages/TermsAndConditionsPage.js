import React, {useEffect, useState} from 'react';

import Grid from '@material-ui/core/Grid';

import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import {makeStyles} from "@material-ui/core";
import AuthService from "../services/AuthService";
const ReactMarkdown = require('react-markdown');

const useStyles = makeStyles({
  legalContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

function TermsAndConditionsPage() {
  const classes = useStyles();
  const [text, setText] = useState('');

  const loadMarkdown = () => {
    fetch('/terms_and_conditions_2019_09_14.md')
        .then((r) => r.text())
        .then(markdown  => {
          setText(markdown);
        });
  };

  useEffect(() => {
    loadMarkdown();
  }, []);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="stretch">
      <TopBar loggedIn={AuthService.loggedIn()} />
      <ReactMarkdown source={text} className={classes.legalContainer}/>
      <Footer />
    </Grid>
  )
}

export default TermsAndConditionsPage;