import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Button,
  Box,
} from '@material-ui/core';
import WidthFixer from "../../../../components/WidthFixer";
import {StripeAccountsContext} from "../../../../stores/StripeAccountsStore";
import RouteConstants from "../../../../RouteConstants";
import {useHistory} from "react-router-dom";
import StyledTableCell from '../../../../components/StyledTableCell'
import StyledTableRow from '../../../../components/StyledTableRow'

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
}));

const StripeAccounts = props => {
  const { stripeAccounts } = useContext(StripeAccountsContext);
  const history = useHistory();

  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h5" color="textPrimary">
            Stripe Accounts <WidthFixer/>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Properties using it</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stripeAccounts.map((row) => (
                  <StyledTableRow key={row.id} hover onClick={() => history.push(RouteConstants.editStripeAccount + row.id)}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.property_names}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box marginTop={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(RouteConstants.addStripeAccount)}
            >
              Add Stripe Account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

StripeAccounts.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default StripeAccounts;
