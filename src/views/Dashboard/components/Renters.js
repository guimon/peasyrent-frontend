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
  renterInput: {
    minWidth: 110,
  }
}));

const Renters = props => {
  const { lease, deleteRenter, saveRenter } = useContext(SingleLeaseContext);
  const { handleSubmit, control, reset } = useForm();

  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = (data) => {
    saveRenter(lease.id, data, openSnackbar, reset);
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow >
                  <StyledTableCell>First name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lease.renters.map((renter, i) => (
                  <StyledTableRow key={`renter-${renter.id}`}>
                    <StyledTableCell component="th" scope="row">
                      {renter.user.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {renter.user.last_name}
                    </StyledTableCell>
                    <StyledTableCell>{renter.user.email}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box className={classes.actionButton}>
                        <Button
                          variant="outlined"
                          type="submit"
                          color="secondary"
                          size="small"
                          name={`delete-renter-${renter.id}`}
                          onClick={() => deleteRenter(lease.id, renter.id, openSnackbar, reset)}
                        >
                          delete renter
                        </Button>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow key="new-renter">
                  <StyledTableCell component="th" scope="row">
                    <Controller
                      render={({ field,  fieldState: { error } }) =>
                        <FieldText
                          field={field}
                          errorState={error}
                          name="name"
                          placeholder="First name"
                          className={classes.renterInput}
                        />
                      }
                      name="name"
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
                          name="last_name"
                          placeholder="Last name"
                          className={classes.renterInput}
                        />
                      }
                      name="last_name"
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
                          name="email"
                          placeholder="E-mail"
                          className={classes.renterInput}
                        />
                      }
                      name="email"
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
                        Add renter
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

Renters.propTypes = {

};

export default Renters;
