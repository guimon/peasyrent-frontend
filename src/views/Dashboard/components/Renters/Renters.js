import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import {
  useMediaQuery,
  Grid, Box, Button, Divider, Hidden, TextField
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../../stores/SingleLeaseStore";
import FieldText from "../../../../components/FieldText";
import {openSnackbar} from "../../../../components/Notifier";

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

const defaultValues = {
  name: '',
  email: '',
};

const Renters = props => {
  const { lease, saveRenter, deleteRenter } = useContext(SingleLeaseContext);
  const { handleSubmit, control, reset } = useForm({ defaultValues });
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = (data) => {
    saveRenter(lease.id, data, openSnackbar, reset);
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                />
              }
              name="name"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                />
              }
              name="email"
              rules={{
                required: true,
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
              }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={classes.actionButton}>
              <Button
                variant="outlined"
                type="submit"
                color="primary"
                size="small"
              >
                Add renter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

Renters.propTypes = {

};

export default Renters;
