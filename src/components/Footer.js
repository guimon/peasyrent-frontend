import React from 'react'
import {Link as RouterLink} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Routes from "../constants/Routes";
import Notifier from "./Notifier";
import classNames from "classnames";

const useStyles = makeStyles({
  footer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  bottomLink: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#0000008a',
  }
});

function Footer() {
  const classes = useStyles();

  return (
      <div className={classNames(classes.footer)}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © Ataraxia Properties! 2021'}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <RouterLink to={Routes.termsAndConditions} className={classes.bottomLink}>
            {'Terms and conditions'}
          </RouterLink>
          &nbsp;|&nbsp;
          <RouterLink to={Routes.privacyPolicy} className={classes.bottomLink}>
            {'Privacy policy'}
          </RouterLink>
        </Typography>
        <Notifier/>
    </div>
  )
}

export default Footer;
