import React from 'react'
import {Link as RouterLink} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  bottomNav: {
    marginTop: 20
  },
  bottomLink: {
    cursor: 'pointer',
    alignSelf: 'start',
    fontVariant: 'all-small-caps',
    textDecoration: 'none',
  }
});

function BottomNavLink(props) {
  const classes = useStyles();

  const { route, color, message } = props;

  return (
      <div className={classes.bottomNav}>
        <RouterLink to={route} className={classes.bottomLink}>
          <Typography color={color}>{message}</Typography>
        </RouterLink>
      </div>
  )
}

export default BottomNavLink;
