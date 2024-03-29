import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputAdornment
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import RouteConstants from "../../../RouteConstants";
import FieldLabel from "../../../components/FieldLabel";
import FieldText from "../../../components/FieldText";
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import {openSnackbar} from "../../../components/Notifier";
import ScrollTo from "../../../components/ScrollTo";
import LeaseFiles from "./LeaseFiles/LeaseFiles";
import Renters from "./Renters";
import {Controller, useForm} from "react-hook-form";
import {PropertiesContext} from "../../../stores/PropertiesStore";
import {CardBase} from "../../../components/organisms/index";
import MessageContainer from "../../RenterDashboard/components/MessageContainer";
import MessagesStore from "../../../stores/MessagesStore";
import Bills from "./Bills"
import {parse} from "query-string";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  wide: {
    width: '100%'
  }
}));

const LeaseForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  let focus = parse(window.location.search).focus;

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
      <Grid container spacing={isMd ? 4 : 2}>
        <CardBase withShadow align="left">
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
                      <FormControl variant="outlined" className={classes.wide} error={!!error} size="small">
                        <Select
                          placeholder="Property"
                          value={field.value || ''}
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
                <Grid item xs={12} sm={4}>
                  <FieldLabel label={"Due day of month"}/>
                  <Controller
                    render={({ field,  fieldState: { error } }) =>
                      <FormControl variant="outlined" className={classes.wide} error={!!error} size="small">
                        <Select
                          placeholder="1"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="day_of_billing"
                        >
                          { Array.from({length: 28}, (_, index) => (
                            <MenuItem key={`day_of_billing_${index+1}`} value={index+1}>{index+1}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    }
                    name="day_of_billing"
                    rules={{ required: true }}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FieldLabel label={"Minimum notice to vacate in days"}/>
                  <Controller
                    render={({ field,  fieldState: { error } }) =>
                      <FormControl variant="outlined" className={classes.wide} error={!!error} size="small">
                        <FieldText
                          field={field}
                          errorState={error}
                          type="number"
                          placeholder="30"
                          name="required_notice_days"
                          inputProps={{ min: 0, max: 90 }}
                        />
                      </FormControl>
                    }
                    name="required_notice_days"
                    rules={{ required: true }}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FieldLabel label={"Coverts to month to month?"}/>
                  <Controller
                    render={({ field,  fieldState: { error } }) =>
                      <FormControl variant="outlined" className={classes.wide} error={!!error} size="small">
                        <Select
                          placeholder="Active"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="converts_to_month_over_month"
                        >
                          <MenuItem value={"true"}>Yes</MenuItem>
                          <MenuItem value={"false"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    }
                    name="converts_to_month_over_month"
                    rules={{ required: true }}
                    control={control}
                  />
                </Grid>
                <Grid item container justifyContent="flex-start" xs={8}>
                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      size="large"
                      name="save"
                      form={"leases-form"}
                    >
                      { !lease && "save" }
                      { lease.id && "update lease" }
                    </Button>
                  </Box>
                </Grid>
                { lease.id &&
                <Grid item container justifyContent="flex-end" xs={4}>
                  <Box>
                    <Button
                      variant="outlined"
                      type="button"
                      color="secondary"
                      size="large"
                      onClick={() => destroy()}
                    >
                      delete lease
                    </Button>
                  </Box>
                </Grid>
                }
              </Grid>
            </div>
          </form>
        </CardBase>
        { lease.id &&
        <>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              { focus === 'bills' && <ScrollTo /> }
              <Typography variant="h5" color="textPrimary">
                Bills
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.wide}>
              <Bills />
            </Grid>
          </CardBase>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Tenants
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.wide}>
              <Renters/>
            </Grid>
          </CardBase>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Files
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.wide}>
              <LeaseFiles />
            </Grid>
          </CardBase>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Messages
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.wide}>
              <MessagesStore lease_id={lease.id}>
                <MessageContainer/>
                { focus === 'messages' && <ScrollTo /> }
              </MessagesStore>
            </Grid>
          </CardBase>
        </>
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
