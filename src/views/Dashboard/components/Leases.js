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
  Button,
  Box, Hidden,
} from '@material-ui/core';
import WidthFixer from "../../../components/WidthFixer";
import {LeasesContext} from "../../../stores/LeasesStore";
import RouteConstants from "../../../RouteConstants";
import {useHistory} from "react-router-dom";
import StyledTableCell from '../../../components/StyledTableCell'
import StyledTableRow from '../../../components/StyledTableRow'
import StyledTableBody from '../../../components/StyledTableBody'
import {CardBase} from "../../../components/organisms/index";
import StyledTableHead from "../../../components/StyledTableHead";
import StyledTable from "../../../components/StyledTable";

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
}));

const Leases = props => {
  const { leases } = useContext(LeasesContext);
  const history = useHistory();

  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <CardBase withShadow align="left">
      <div className={className} {...rest}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              Leases <WidthFixer/>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <StyledTable className={classes.table}>
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableCell>Property</StyledTableCell>
                    <Hidden smDown>
                      <StyledTableCell>Deposit</StyledTableCell>
                    </Hidden>
                    <StyledTableCell>Monthly</StyledTableCell>
                    <Hidden smDown>
                      <StyledTableCell>Start date</StyledTableCell>
                    </Hidden>
                    <StyledTableCell>End date</StyledTableCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {leases.map((row) => (
                    <StyledTableRow key={row.id} hover onClick={() => history.push(RouteConstants.editLease + row.id)}>
                      <StyledTableCell>
                        {row.property.name}
                      </StyledTableCell>
                      <Hidden smDown>
                        <StyledTableCell>${row.deposit_amount/100}</StyledTableCell>
                      </Hidden>
                      <StyledTableCell>${row.monthly_amount/100}</StyledTableCell>
                      <Hidden smDown>
                        <StyledTableCell>{row.start_date ? moment(row.start_date, "YYYY-MM-DD").format("ddd MMM DD YYYY") : '-'}</StyledTableCell>
                      </Hidden>
                      <StyledTableCell>{row.end_date ? moment(row.end_date, "YYYY-MM-DD").format("ddd MMM DD YYYY") : '-'}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </StyledTableBody>
              </StyledTable>
            </TableContainer>

            <Box marginTop={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(RouteConstants.addLease)}
              >
                Add lease
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </CardBase>
  );
};

Leases.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Leases;
