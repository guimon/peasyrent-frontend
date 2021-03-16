import React from 'react'

import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

function SecondarySubtitleText(props) {
  const {label, paddingTop = 0, paddingBottom = 1} = props;

  return (
    <Box pb={paddingBottom} pt={paddingTop}>
      <Typography variant={"h6"}>
        {label}
      </Typography>
    </Box>
  )
}

export default SecondarySubtitleText;
