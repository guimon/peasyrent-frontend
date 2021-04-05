import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

function FieldLabel(props){
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Typography
      variant="subtitle1"
      color="textPrimary"
      className={classes.inputTitle}
    >
      {props.label}
    </Typography>
  )
}

export default FieldLabel;
