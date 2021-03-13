import React from 'react';

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid/Grid";

import StyledButton from "./StyledButton";

function StepButtons(props) {
  const { firstStep = false, disabled, onClickBack, onClickNext, nextLabel = "Next"} = props;

  return (
    <Grid container>
      { !firstStep &&
        <Box mr={2}>
          <StyledButton
            info
            label={'Back'}
            onClick={onClickBack}
          />
        </Box>
      }

      <StyledButton
          enabled={!disabled}
          label={nextLabel}
          onClick={onClickNext}
      />
    </Grid>
  )
}

export default StepButtons;
