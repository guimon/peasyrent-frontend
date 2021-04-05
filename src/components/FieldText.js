import React from 'react'

import {TextField} from "@material-ui/core";

function FieldText(props){
  return (
    <TextField
      variant="outlined"
      size="medium"
      fullWidth
      {...props}
    />
  )
}

export default FieldText;
