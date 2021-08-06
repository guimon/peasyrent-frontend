import {makeStyles, TableRow} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: props => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.alternate.main,
    },
    cursor: props.onClick ? 'pointer' : 'default'
  }),
}));

const StyledTableRow = props => {
  const { children, ...rest } = props;
  const classes = useStyles(props);

  return (<TableRow component="div" classes={{root: classes.root}} {...rest}>{children}</TableRow>);
};

export default StyledTableRow;
