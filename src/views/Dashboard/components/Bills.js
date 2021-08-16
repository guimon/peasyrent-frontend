import React, {useContext} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  TableContainer,
  Paper,
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import StyledTableBody from "../../../components/StyledTableBody";
import StyledTableHead from "../../../components/StyledTableHead";
import StyledTable from "../../../components/StyledTable";
import BillForm from "./BillForm";

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: 16
  },
}));

const Bills = props => {
  const { lease } = useContext(SingleLeaseContext);

  const theme = useTheme();
  const classes = useStyles();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={isMd ? 4 : 2} className={classes.form}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Due on</StyledTableCell>
                <StyledTableCell>Paid on</StyledTableCell>
                <StyledTableCell/>
              </StyledTableRow>
            </StyledTableHead>
            <StyledTableBody>
              {lease.bills.map((bill) => (
                <BillForm key={`billform-${bill.id}`} bill={bill} />
              ))}
              <BillForm />
            </StyledTableBody>
          </StyledTable>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

Bills.propTypes = {

};

export default Bills;
