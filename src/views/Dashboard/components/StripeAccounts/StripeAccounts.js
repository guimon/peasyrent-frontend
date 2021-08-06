import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TableContainer,
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
import StyledTableBody from '../../../../components/StyledTableBody'
import {CardBase} from "../../../../components/organisms";
import StyledTableHead from "../../../../components/StyledTableHead";
import StyledTable from "../../../../components/StyledTable";

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
    <CardBase withShadow align="left">
      <div className={className} {...rest}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              Stripe Accounts <WidthFixer/>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <StyledTable className={classes.table}>
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Properties using it</StyledTableCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {stripeAccounts.map((row) => (
                    <StyledTableRow key={row.id} hover onClick={() => history.push(RouteConstants.editStripeAccount + row.id)}>
                      <StyledTableCell>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.property_names.join(' , ')}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </StyledTableBody>
              </StyledTable>
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
    </CardBase>
  );
};

StripeAccounts.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default StripeAccounts;
