import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

function SubtitleText(props) {
  const {label, paddingTop = 1, paddingBottom = 3} = props;

  return (
    <Box pb={paddingBottom} pt={paddingTop}>
      <Typography color="primary" variant={"h5"}>
        {label}
      </Typography>
    </Box>
  )
}

export default SubtitleText;
