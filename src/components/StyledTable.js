import {Table} from "@material-ui/core";
import React from "react";

const StyledTable = props => {
  const { children, ...rest } = props;
  return (<Table component="div" size="small" {...rest}>{children}</Table>);
};

export default StyledTable;
