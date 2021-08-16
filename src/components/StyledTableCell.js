import {makeStyles, TableCell} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
    verticalAlign: 'middle',
  }
}));

const StyledTableCell = props => {
  const { children, ...rest } = props;
  const classes = useStyles(props);

  return (<TableCell component="div" classes={classes} {...rest}>{children}</TableCell>);
};

export default StyledTableCell;
