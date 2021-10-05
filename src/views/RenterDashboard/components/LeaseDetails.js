import React, {useContext} from 'react';

import {useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";

import {useMediaQuery} from "@material-ui/core";
import moment from "moment";
import FieldLabel from "../../../components/FieldLabel";
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import NumberFormat from "react-number-format";

function LeaseDetails(props){
  const { lease } = useContext(SingleLeaseContext);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const dueDayCardinal = () => {
    if (lease.day_of_billing === 1) {
      return "1st";
    }

    if (lease.day_of_billing === 2) {
      return "2nd";
    }

    if (lease.day_of_billing === 3) {
      return "3rd";
    }

    if (lease.day_of_billing) {
      return lease.day_of_billing + "th";
    }
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12} sm={4}>
        Address
        <FieldLabel label={lease.property.address}/>
      </Grid>
      <Grid item xs={12} sm={4}>
        Start date
        <FieldLabel label={moment(lease.start_date).format("MM/DD/YYYY")}/>
      </Grid>
      <Grid item xs={12} sm={4}>
        End date
        <FieldLabel label={moment(lease.end_date).format("MM/DD/YYYY")}/>
      </Grid>
      <Grid item xs={12} sm={4}>
        Deposit amount
        <FieldLabel label={<NumberFormat value={lease.deposit_amount} displayType={'text'} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2}/>}/>
      </Grid>
      <Grid item xs={12} sm={4}>
        Monthly amount
        <FieldLabel label={<NumberFormat value={lease.monthly_amount} displayType={'text'} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2}/>}/>
      </Grid>
      <Grid item xs={12} sm={4}>
        Due day of month
        <FieldLabel label={dueDayCardinal()}/>
      </Grid>
    </Grid>
  )
}

export default LeaseDetails;
