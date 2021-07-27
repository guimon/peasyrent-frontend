import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Box,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import {openSnackbar} from "../../../components/Notifier";
import {Controller, useForm} from "react-hook-form";
import FieldText from "../../../components/FieldText";

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  actionButton: {
    paddingTop: 12
  },
  form: {
    marginTop: 16
  },
  billInput: {
    minWidth: 110,
  }
}));

const Bills = props => {
  const { lease, deleteBill, saveBill } = useContext(SingleLeaseContext);
  const { handleSubmit, control, reset } = useForm();

  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = (data) => {
    saveBill(lease.id, data, openSnackbar, reset);
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow >
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Due on</StyledTableCell>
                  <StyledTableCell>Paid on</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lease.bills.map((bill, i) => (
                  <StyledTableRow key={`bill-${bill.id}`}>
                    <StyledTableCell component="th" scope="row">
                      {bill.description}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {bill.amount}
                    </StyledTableCell>
                    <StyledTableCell>
                      {bill.due_on}
                    </StyledTableCell>
                    <StyledTableCell>
                      {bill.paid_on}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box className={classes.actionButton}>
                        <Button
                          variant="outlined"
                          type="submit"
                          color="secondary"
                          size="small"
                          name={`delete-bill-${bill.id}`}
                          onClick={() => deleteBill(lease.id, bill.id)}
                        >
                          delete
                        </Button>
                        <Button
                          variant="outlined"
                          type="submit"
                          color="secondary"
                          size="small"
                          name={`update-bill-${bill.id}`}
                          onClick={() => saveBill(lease.id, bill)}
                        >
                          save
                        </Button>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow key="new-bill">
                  <StyledTableCell component="th" scope="row">
                    <Controller
                      render={({ field,  fieldState: { error } }) =>
                        <FieldText
                          field={field}
                          errorState={error}
                          name="description"
                          placeholder="Description"
                          className={classes.billInput}
                        />
                      }
                      name="description"
                      rules={{ required: true }}
                      control={control}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Controller
                      render={({ field,  fieldState: { error } }) =>
                        <FieldText
                          field={field}
                          errorState={error}
                          name="amount"
                          placeholder="amount"
                          className={classes.billInput}
                        />
                      }
                      name="amount"
                      rules={{ required: true }}
                      control={control}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Controller
                      render={({ field,  fieldState: { error } }) =>
                        <FieldText
                          field={field}
                          errorState={error}
                          name="due_on"
                          placeholder="Due on"
                          className={classes.billInput}
                        />
                      }
                      name="due_on"
                      rules={{
                        required: true,
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
                      }}
                      control={control}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Controller
                      render={({ field,  fieldState: { error } }) =>
                        <FieldText
                          field={field}
                          errorState={error}
                          name="paid_on"
                          placeholder="Paid on"
                          className={classes.billInput}
                        />
                      }
                      name="paid_on"
                      rules={{
                        required: true,
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
                      }}
                      control={control}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box className={classes.actionButton}>
                      <Button
                        variant="outlined"
                        type="submit"
                        color="primary"
                        size="small"
                      >
                        Add bill
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Grid>
    </Grid>
  );
};

Bills.propTypes = {

};

export default Bills;
