import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  InputAdornment
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../stores/SingleLeaseStore";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import {openSnackbar} from "../../../components/Notifier";
import {Controller, useForm} from "react-hook-form";
import FieldText from "../../../components/FieldText";

const useStyles = makeStyles(theme => ({
  actionButton: {
    whiteSpace: 'nowrap'
  },
  form: {
    marginTop: 16,
    display: 'contents',
  },
  billInput: {
    minWidth: 110,
  },
  margin: {
    marginRight: 8,
  }
}));

const BillForm = props => {
  const { lease, deleteBill, saveBill, updateBill } = useContext(SingleLeaseContext);
  const { bill } = props;
  const { handleSubmit, control, reset, formState } = useForm({defaultValues: bill});
  const { isDirty } = formState;

  const classes = useStyles();

  const onSubmit = (data) => {
    if (data.id) {
      updateBill(lease, data, openSnackbar, reset(data));
    } else {
      saveBill(lease, data, openSnackbar, reset);
    }
  };

  return (
    <StyledTableRow key={bill ? `bill-${bill.id}` : 'new-bill'} id={bill ? `bill-${bill.id}` : 'new-bill'}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
                type="date"
                className={classes.billInput}
              />
            }
            name="paid_on"
            control={control}
          />
        </StyledTableCell>
        <StyledTableCell>
          {bill &&
          <>
            <Box className={classes.actionButton}>
              {isDirty &&
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="small"
                className={classes.margin}
                name={`update-bill-${bill.id}`}
              >
                save
              </Button>
              }
              <Button
                variant="outlined"
                type="button"
                color="secondary"
                size="small"
                name={`delete-bill-${bill.id}`}
                onClick={() => deleteBill(lease, bill.id, openSnackbar, reset)}
              >
                delete
              </Button>
            </Box>
          </>
          }
          {!bill &&
          <Box className={classes.actionButton}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="small"
            >
              add bill
            </Button>
          </Box>
          }
        </StyledTableCell>
      </form>
    </StyledTableRow>
  );
};

BillForm.propTypes = {

};

export default BillForm;
