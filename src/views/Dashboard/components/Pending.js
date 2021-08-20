import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TableContainer,
  Paper,
  Box,
} from '@material-ui/core';
import {LeasesContext} from "../../../stores/LeasesStore";
import RouteConstants from "../../../RouteConstants";
import {useHistory} from "react-router-dom";
import StyledTableCell from '../../../components/StyledTableCell'
import StyledTableRow from '../../../components/StyledTableRow'
import StyledTableBody from '../../../components/StyledTableBody'
import {CardBase} from "../../../components/organisms";
import StyledTableHead from "../../../components/StyledTableHead";
import StyledTable from "../../../components/StyledTable";

const useStyles = makeStyles(theme => ({
  wide: {
    width: '100%',
  },
}));

const Pending = props => {
  const { leases } = useContext(LeasesContext);
  const history = useHistory();

  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const focus = (lease) => {
    if (lease.payment_overdue) {
      return "&focus=bills"
    } else if (lease.new_tenant_message) {
      return "&focus=messages"
    }
  };

  return (
    <CardBase withShadow align="left">
      <div  className={classes.wide}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              Dashboard
            </Typography>
          </Grid>
          {leases.length === 0 &&
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="h6" color="textPrimary">
                Good news! Everything is taken care of and nothing requires immediate attention.
              </Typography>
            </Box>
          </Grid>
          }
          {leases.length > 0 &&
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="h6" color="textPrimary">
                Leases requiring attention
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <StyledTable className={classes.wide}>
                <StyledTableHead>
                  <StyledTableRow >
                    <StyledTableCell>Property</StyledTableCell>
                    <StyledTableCell>Renters</StyledTableCell>
                    <StyledTableCell>End date</StyledTableCell>
                    <StyledTableCell>Reason</StyledTableCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {leases.map((row) => (
                    <StyledTableRow key={row.id} hover onClick={() => history.push(RouteConstants.editLease + row.id + focus(row))}>
                      <StyledTableCell>
                        {row.property.name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.renter_names}
                      </StyledTableCell>
                      <StyledTableCell>{row.end_date ? moment(row.end_date, "YYYY-MM-DD").format("ddd MMM DD YYYY") : '-'}</StyledTableCell>
                      <StyledTableCell>
                        {row.requires_attention_reason}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </StyledTableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
          }
        </Grid>
      </div>
    </CardBase>
  );
};

Pending.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Pending;
