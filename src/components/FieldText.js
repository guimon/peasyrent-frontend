import React from 'react'

import {TextField} from "@material-ui/core";

function FieldText(props){
  const { field, errorState, ...rest } = props;
  let value;

  if (!field) {
    console.error("Missing field");
    console.error(props);
  }
  // removing null from field.value
  if (field.value) {
    value = field.value;
  }

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      value={value || ''}
      onChange={field.onChange}
      inputRef={field.ref}
      error={!!errorState}
      {...rest}
    />
  )
}

export default FieldText;
