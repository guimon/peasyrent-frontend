import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputAdornment
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import RouteConstants from "../../../../RouteConstants";
import FieldLabel from "../../../../components/FieldLabel";
import FieldText from "../../../../components/FieldText";
import {SingleLeaseContext} from "../../../../stores/SingleLeaseStore";
import {openSnackbar} from "../../../../components/Notifier";
import LeaseFiles from "../LeaseFiles/LeaseFiles";
import Renters from "../Renters/Renters";
import {Controller, useForm} from "react-hook-form";
import {PropertiesContext} from "../../../../stores/PropertiesStore";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  formControl: {
    width: '100%'
  }
}));

const LeaseForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { lease, saveLease, updateLease, deleteLease } = useContext(SingleLeaseContext);
  const { properties } = useContext(PropertiesContext);
  const { handleSubmit, control } = useForm({ defaultValues: lease });

  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = (data) => {
    if (lease.id) {
      updateLease(data, openSnackbar);
    } else {
      saveLease(data, openSnackbar);
    }
  };

  const destroy = () => {
    deleteLease(lease, openSnackbar, () => history.push(RouteConstants.leases));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} id={"leases-form"}>
        <div className={className} {...rest}>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                { lease.property?.name || "Add new lease"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FieldLabel label={"Property"}/>
              <Controller
                render={({ field,  fieldState: { error } }) =>
                  <FormControl variant="outlined" className={classes.formControl} error={!!error}>
                    <Select
                      placeholder="Property"
                      value={field.value}
                      onChange={field.onChange}
                      name="property_id"
                    >
                      {properties.map((property) => (
                        <MenuItem key={`property_id_${property.id}`} value={property.id}>{property.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                }
                name="property_id"
                rules={{ required: true }}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FieldLabel label={"Start date"}/>
              <Controller
                render={({ field,  fieldState: { error } }) =>
                  <FieldText
                    field={field}
                    errorState={error}
                    type="date"
                    name="start_date"
                  />
                }
                name="start_date"
                rules={{ required: true }}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FieldLabel label={"End date"}/>
              <Controller
                render={({ field,  fieldState: { error } }) =>
                  <FieldText
                    field={field}
                    errorState={error}
                    type="date"
                    name="end_date"
                  />
                }
                name="end_date"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FieldLabel label={"Deposit amount"}/>
              <Controller
                render={({ field,  fieldState: { error } }) =>
                  <FieldText
                    field={field}
                    errorState={error}
                    type="number"
                    placeholder="800"
                    name="deposit_amount"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                }
                name="deposit_amount"
                rules={{ required: true }}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FieldLabel label={"Monthly amount"}/>
              <Controller
                render={({ field,  fieldState: { error } }) =>
                  <FieldText
                    field={field}
                    errorState={error}
                    type="number"
                    placeholder="800"
                    name="monthly_amount"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                }
                name="monthly_amount"
                rules={{ required: true }}
                control={control}
              />
            </Grid>
          </Grid>
        </div>
      </form>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        { lease.id &&
        <>
          <Grid item xs={12}>
            <FieldLabel label={"Tenants"}/>
            <Renters/>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FieldLabel label={"Files"}/>
            <LeaseFiles />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </>
        }
        <Grid item container justify="flex-start" xs={8}>
          <Box marginRight={2}>
            <Button
              variant="outlined"
              type="button"
              color="primary"
              size="large"
              name="back"
              onClick={() => history.push(RouteConstants.leases)}
            >
              back
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              name="save"
              form={"leases-form"}
            >
              save
            </Button>
          </Box>
        </Grid>
        { lease.id &&
          <Grid item container justify="flex-end" xs={4}>
            <Box>
              <Button
                variant="outlined"
                type="button"
                color="secondary"
                size="large"
                onClick={() => destroy()}
              >
                delete
              </Button>
            </Box>
          </Grid>
        }
      </Grid>
    </>
  );
};

LeaseForm.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default LeaseForm;
