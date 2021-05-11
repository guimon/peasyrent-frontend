import React, {useContext, useState, useEffect} from 'react';
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
  FormHelperText,
  Select,
  InputAdornment
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import RouteConstants from "../../../../RouteConstants";
import FieldLabel from "../../../../components/FieldLabel";
import FieldText from "../../../../components/FieldText";
import {SingleLeaseContext} from "../../../../stores/SingleLeaseStore";
import {openSnackbar} from "../../../../components/Notifier";
import PropertyService from "../../../../services/PropertyService";
import ErrorHandlerHelper from "../../../../helpers/ErrorHandlerHelper";
import LeaseFiles from "../LeaseFiles/LeaseFiles";
import Renters from "../Renters/Renters";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  formControl: {
    width: '100%'
  }
}));

const LeasesForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { lease, saveLease, updateLease, deleteLease } = useContext(SingleLeaseContext);
  const [properties, setProperties] = useState([]);
  const [errors, setErrors] = useState({});

  const [propertyId, setPropertyId] = useState(lease.property_id || '');
  const [startDate, setStartDate] = useState(lease.start_date || '');
  const [endDate, setEndDate] = useState(lease.end_date || '');
  const [depositAmount, setDepositAmount] = useState(lease.deposit_amount || 0);
  const [monthlyAmount, setMonthlyAmount] = useState(lease.monthly_amount || 0);

  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    PropertyService.index(false).then().then(response => {
      setProperties(response.data.data.map((hash) => {return hash.attributes}));
    }).catch(error => { ErrorHandlerHelper(error) });
  }, []);

  const updateLeaseWithState = () => {
    lease.property_id = propertyId;
    lease.start_date = startDate;
    lease.end_date = endDate;
    lease.deposit_amount = depositAmount;
    lease.monthly_amount = monthlyAmount;
  };

  const validate = () => {
    let newErrors = {};

    if (!startDate) { newErrors.startDate = 'Start date is required'; }
    if (!propertyId) { newErrors.propertyId = 'Property is required'; }
    if (!monthlyAmount) { newErrors.monthlyAmount = 'Monthly amount is required'; }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    if (validate()) {
      updateLeaseWithState();
      if (lease.id) {
        updateLease(lease, openSnackbar);
      } else {
        saveLease(lease, openSnackbar);
      }
    }
  };

  const destroy = () => {
    if (lease.id) {
      deleteLease(lease, openSnackbar, () => history.push(RouteConstants.leases));
    }
  };

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h5" color="textPrimary">
            { !lease && "Add new lease"}
            { lease && lease.property?.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Property"}/>
          <FormControl variant="outlined" className={classes.formControl} error={!!errors.propertyId}>
            <Select
              placeholder="Property"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            >
              {properties.map((property) => (
                <MenuItem key={`property_id_${property.id}`} value={property.id}>{property.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.propertyId}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Start date"}/>
          <FieldText
            name="start_date"
            type="date"
            value={startDate}
            error={!!errors.startDate}
            helperText={errors.startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"End date"}/>
          <FieldText
            name="end_date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Deposit amount"}/>
          <FieldText
            placeholder="800"
            name="deposit_amount"
            value={depositAmount/100.0}
            onChange={(e) => setDepositAmount(e.target.value*100)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Monthly amount"}/>
          <FieldText
            placeholder="800"
            name="monthly_amount"
            value={monthlyAmount/100.0}
            error={!!errors.monthlyAmount}
            helperText={errors.monthlyAmount}
            onChange={(e) => setMonthlyAmount(e.target.value*100)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        { lease.id &&
        <>
          <Grid item xs={12}>
            <FieldLabel label={"Renters"}/>
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
              type="submit"
              color="primary"
              size="large"
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
              onClick={() => save()}
            >
              save
            </Button>
          </Box>
        </Grid>
        <Grid item container justify="flex-end" xs={4}>
          <Box>
            <Button
              variant="outlined"
              type="submit"
              color="secondary"
              size="large"
              onClick={() => destroy()}
            >
              delete
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

LeasesForm.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default LeasesForm;
