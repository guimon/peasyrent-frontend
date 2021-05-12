import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RenterForm from "./RenterForm";
import {
  useMediaQuery,
  Grid, Box, Button, Divider, Hidden, TextField
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../../stores/SingleLeaseStore";

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
  actionButton: {
    paddingTop: 12
  },
  form: {
    marginTop: 16
  }
}));

const Renters = props => {
  const { lease, deleteRenter } = useContext(SingleLeaseContext);
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <>
      <Grid container spacing={isMd ? 4 : 2}>
        {lease && lease.renters.map((renter, i) => (
          <React.Fragment key={`renter-${renter.id}`}>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                size="medium"
                fullWidth
                placeholder="Name"
                value={renter.user.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                size="medium"
                fullWidth
                placeholder="E-mail"
                value={renter.user.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.actionButton}>
                <Button
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  size="small"
                  onClick={() => deleteRenter(lease.id, renter.id)}
                >
                  delete renter
                </Button>
              </Box>
            </Grid>
            {lease.renters.length > i + 1 &&
            <Hidden smUp>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
            </Hidden>
            }
          </React.Fragment>
        ))}
      </Grid>
      <RenterForm />
    </>
  );
};

Renters.propTypes = {

};

export default Renters;
