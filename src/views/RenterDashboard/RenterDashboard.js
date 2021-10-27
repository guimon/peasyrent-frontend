import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  Link,
  Grid,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { SectionAlternate, CardBase } from '../../components/organisms';
import Hero from './Hero';
import useEnsuredLoggedInUser from "../../hooks/useEnsuredLoggedInUser";
import RouteConstants from "../../RouteConstants";
import LeasePicker from "./components/LeasePicker"
import LeaseDetails from "./components/LeaseDetails";
import LeasesStore, {LeasesContext} from "../../stores/LeasesStore";
import UserService from "../../services/UserService";
import MessagesStore from "../../stores/MessagesStore";
import MessageContainer from "./components/MessageContainer";
import SingleLeaseStore from "../../stores/SingleLeaseStore";
import RenterBills from "./components/RenterBills";
import {parse} from "query-string";

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
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

export const subPages = [
  {
    id: 'dashboard',
    group: 'dashboard',
    href: RouteConstants.renterDashboard,
    title: 'Dashboard',
  },
  {
    id: 'payment-methods',
    group: 'payment-methods',
    href: RouteConstants.paymentMethods,
    title: 'Payment methods',
  },
  {
    id: 'messages',
    group: 'messages',
    href: RouteConstants.renterMessages,
    title: 'Messages',
  },
];

const RenterDashboard = (props = {}) => {
  useEnsuredLoggedInUser();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid item xs={12}>
          <LeasesStore>
            <RenterDashboardContents/>
          </LeasesStore>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

const RenterDashboardContents = (props = {}) => {
  const [lease, setLease] = useState();
  const { leases } = useContext(LeasesContext);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const user = UserService.getUser();
  let leaseId = parse(window.location.search).leaseId;

  useEffect(() => {
    if (leases && leases.length === 1) {
      setLease(leases[0]);
    } else if (leaseId) {
      setLease(leases.find((l) => l.id.toString() === leaseId));
    }
  }, [leases, leaseId]);

  return (
    <>
      <CardBase withShadow align="left">
        <Grid container spacing={isMd ? 4 : 2}>
          {user && <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              Welcome, {user.name}!
            </Typography>
          </Grid>
          }
          <LeasePicker lease={lease} setLease={setLease}/>
        </Grid>
      </CardBase>
      {lease && <>
        <SingleLeaseStore id={lease.id}>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="textPrimary">
                  Lease details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LeaseDetails />
              </Grid>
            </Grid>
          </CardBase>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Bills
              </Typography>
            </Grid>
            <Grid item xs={12} style={{width: '100%'}}>
              <RenterBills />
            </Grid>
          </CardBase>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Messages
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MessagesStore lease_id={lease.id}>
                <MessageContainer/>
              </MessagesStore>
            </Grid>
          </CardBase>
          <CardBase withShadow align="left" style={{marginTop: 24}}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Lease files
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {lease.files.map((file, i) => (
                <Link href={file.url} target={"_blank"} key={`lease-file-${file.id}`} style={{margin: 12}}>
                  <Typography>
                    {file.description}
                  </Typography>
                </Link>
              ))}
            </Grid>
          </CardBase>
        </SingleLeaseStore>
      </>}
    </>
  );
};

export default RenterDashboard;
