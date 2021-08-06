import {TableBody} from "@material-ui/core";
import React from "react";

const StyledTableBody = props => {
  const { children, ...rest } = props;
  return (<TableBody component="div" {...rest}>{children}</TableBody>);
};

export default StyledTableBody;
