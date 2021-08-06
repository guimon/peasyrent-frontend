import {TableHead} from "@material-ui/core";
import React from "react";

const StyledTableHead = props => {
  const { children, ...rest } = props;
  return (<TableHead component="div" {...rest}>{children}</TableHead>);
};

export default StyledTableHead;
