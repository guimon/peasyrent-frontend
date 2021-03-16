import React from 'react'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 10,
    paddingTop : 60,
    paddingBottom : 60,
  },
  tagline: {
    textAlign: 'center',
    color: 'white',
  }
});

function TaglineSection() {
  const classes = useStyles();
  return (
    <div className={`${classes.root} blue-gradient`}>
      <Typography className={classes.tagline} variant='h4'>
        {"Have a virtual drink with a far away friend!"}
      </Typography>
    </div>
  )
}
export default TaglineSection;