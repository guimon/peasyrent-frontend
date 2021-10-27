import React, {useContext} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  TableContainer,
  Paper, Button, Box, Hidden,
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import StyledTableBody from "../../../components/StyledTableBody";
import StyledTableHead from "../../../components/StyledTableHead";
import StyledTable from "../../../components/StyledTable";
import moment from "moment";
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Colors from "../../../constants/Colors";

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: 16
  },
  actionButton: {
    whiteSpace: 'nowrap'
  },
  late: {
    color: '#ff0000',
  }
}));

const RenterBills = props => {
  const { lease, setupPayment } = useContext(SingleLeaseContext);

  const theme = useTheme();
  const classes = useStyles();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const showableBills = () => lease.bills.filter((bill) => moment(bill.due_on, "YYYY-MM-DD").isSameOrBefore(moment().add(30, 'days'))).reverse();

  const isLate = (bill) => !bill.paid_on && moment(bill.due_on, "YYYY-MM-DD").add(1, 'days').isBefore(moment());

  const dueOnFormatted = (bill) => {
    if (moment(bill.due_on).isSame(moment(), 'day')) {
      return "Today";
    } else if (moment(bill.due_on).subtract(1, 'days').isSame(moment(), 'day')) {
      return "Tomorrow";
    } else {
      return  moment(bill.due_on, "YYYY-MM-DD").format("ddd MMM DD YYYY");
    }
  };

  const redirectToPayment = (bill) => {
    setupPayment(bill);
  };

  return (
    <Grid container spacing={isMd ? 4 : 2} className={classes.form}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCell>Description</StyledTableCell>
                <Hidden smDown>
                  <StyledTableCell>Amount</StyledTableCell>
                </Hidden>
                <StyledTableCell>Due</StyledTableCell>
                <Hidden smDown>
                  <StyledTableCell>Paid on</StyledTableCell>
                </Hidden>
                <StyledTableCell>Payment</StyledTableCell>
              </StyledTableRow>
            </StyledTableHead>
            <StyledTableBody id={"bills-table"}>
              {showableBills().map((bill) => (
                <StyledTableRow key={`bill-${bill.id}`} id={`bill-${bill.id}`}>
                  <StyledTableCell>
                    {bill.description}
                  </StyledTableCell>
                  <Hidden smDown>
                    <StyledTableCell>
                      <NumberFormat value={bill.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2}/>
                    </StyledTableCell>
                  </Hidden>
                  <StyledTableCell>
                    <span className={isLate(bill) ? classes.late : ''} title={!bill.paid_on ? moment(bill.due_on, "YYYY-MM-DD").format("ddd MMM DD YYYY") : ''}>
                      {dueOnFormatted(bill)}
                    </span>
                  </StyledTableCell>
                  <Hidden smDown>
                    <StyledTableCell>
                      {bill.paid_on ? moment(bill.paid_on, "YYYY-MM-DD").format("ddd MMM DD YYYY") : ''}
                    </StyledTableCell>
                  </Hidden>
                  <StyledTableCell>
                    <Box className={classes.actionButton}>
                      {!bill.paid_on &&
                        <Button
                          variant="contained"
                          type="button"
                          color={moment(bill.due_on, "YYYY-MM-DD").add(1, 'days').isBefore(moment()) ? "secondary" : "primary"}
                          size="small"
                          name={`pay-bill-${bill.id}`}
                          onClick={() => redirectToPayment(bill)}
                        >
                          {moment(bill.due_on, "YYYY-MM-DD").add(1, 'days').isBefore(moment()) ? "Pay Overdue" : "Pay"}
                        </Button>
                      }
                      {bill.paid_on && <CheckCircleIcon style={{marginLeft: 20}} htmlColor={Colors.greenLeaf}/>}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </StyledTableBody>
          </StyledTable>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

RenterBills.propTypes = {

};

export default RenterBills;
