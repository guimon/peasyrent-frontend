import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import {
  Grid, Box, Button
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

const RenterForm = props => {
  const { lease, saveRenter } = useContext(SingleLeaseContext);
  const { handleSubmit, control, reset } = useForm({ defaultValues });
  const classes = useStyles();

  const onSubmit = (data) => {
    saveRenter(lease.id, data, openSnackbar, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Controller
            render={({ field,  fieldState: { error } }) =>
              <FieldText
                field={field}
                errorState={error}
                name="name"
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
                name="email"
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
  );
};

RenterForm.propTypes = {

};

export default RenterForm;
