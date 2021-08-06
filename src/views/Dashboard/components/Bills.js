import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Box,
  Button,
  TableContainer,
  Paper,
  InputAdornment
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import {openSnackbar} from "../../../components/Notifier";
import {Controller, useForm} from "react-hook-form";
import FieldText from "../../../components/FieldText";
import StyledTableBody from "../../../components/StyledTableBody";
import StyledTableHead from "../../../components/StyledTableHead";
import StyledTable from "../../../components/StyledTable";

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  actionButton: {
    whiteSpace: 'nowrap'
  },
  form: {
    marginTop: 16
  },
  billInput: {
    minWidth: 110,
  },
  padding: {
    marginRight: 8
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
    saveBill(lease, data, openSnackbar, reset);
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
                {lease.bills.map((bill, i) => (
                  <StyledTableRow key={`bill-${bill.id}`}>
                    <StyledTableCell>
                      {bill.description}
                    </StyledTableCell>
                    <StyledTableCell>
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
                          color="primary"
                          size="small"
                          className={classes.padding}
                          name={`update-bill-${bill.id}`}
                          onClick={() => saveBill(lease, bill)}
                          style={{paddingRight: 10}}
                        >
                          save
                        </Button>
                        <Button
                          variant="outlined"
                          type="submit"
                          color="secondary"
                          size="small"
                          name={`delete-bill-${bill.id}`}
                          onClick={() => deleteBill(lease, bill.id, openSnackbar, reset)}
                        >
                          delete
                        </Button>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow key="new-bill">
                  <StyledTableCell>
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
                  <StyledTableCell>
                    <Controller
                      render={({ field,  fieldState: { error } }) =>
                        <FieldText
                          field={field}
                          errorState={error}
                          type="number"
                          placeholder="800"
                          name="amount"
                          className={classes.billInput}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
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
                          type="date"
                          className={classes.billInput}
                        />
                      }
                      name="due_on"
                      rules={{
                        required: true,
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
                          type="date"
                          className={classes.billInput}
                        />
                      }
                      name="paid_on"
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
              </StyledTableBody>
            </StyledTable>
          </TableContainer>
        </form>
      </Grid>
    </Grid>
  );
};

Bills.propTypes = {

};

export default Bills;
