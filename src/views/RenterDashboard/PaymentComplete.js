import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {
  Grid,
  Typography,
  useMediaQuery,
  LinearProgress
} from '@material-ui/core';
import { SectionAlternate, CardBase } from '../../components/organisms';
import Hero from './Hero';
import useEnsuredLoggedInUser from "../../hooks/useEnsuredLoggedInUser";
import RouteConstants from "../../RouteConstants";
import {parse} from "query-string";
import LeaseService from "../../services/LeaseService";
import Colors from "../../constants/Colors";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  success: {
    backgroundColor: Colors.greenLeaf
  }
}));

const PaymentComplete = (props = {}) => {
  useEnsuredLoggedInUser();
  const classes = useStyles();
  let billId = parse(window.location.search).billId;
  let leaseId = parse(window.location.search).leaseId;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [processing, setProcessing] = useState("processing");

  const history = useHistory();

  useEffect(() => {
    LeaseService.verifyPayment(billId).then(response => {
      setProcessing("success");
      setTimeout(() => {
        history.push(RouteConstants.renterDashboard + "?leaseId=" + leaseId);
      }, 2000);
    }).catch(error => {
      setProcessing("failed");
      setTimeout(() => {
        history.push(RouteConstants.renterDashboard + "?leaseId=" + leaseId);
      }, 4000);
    });
  }, [billId, leaseId, history]);

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid item xs={12}>
          <CardBase withShadow align="left">
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid item xs={12}>
                {processing === "processing" && <>
                  <Typography variant="h6" color="textPrimary">
                    Processing your payment, please wait.
                  </Typography>
                  <LinearProgress color={"primary"} style={{marginTop: 12}}/>
                </>
                }
                {processing === "failed" && <>
                  <Typography variant="h6" color="textPrimary">
                    Unfortunately the payment didn't go through. Please try again.
                  </Typography>
                  <LinearProgress color={"secondary"} variant="determinate" value={100} style={{marginTop: 12}}/>
                </>
                }
                {processing === "success" && <>
                  <Typography variant="h6" color="textPrimary">
                    Thank you for your payment!
                  </Typography>
                  <LinearProgress color={"primary"} variant="determinate" value={100} classes={{ barColorPrimary: classes.success}} style={{marginTop: 12}}/>
                </>
                }
              </Grid>
            </Grid>
          </CardBase>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default PaymentComplete;
