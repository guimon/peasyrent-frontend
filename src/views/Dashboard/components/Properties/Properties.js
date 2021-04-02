import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box,
} from '@material-ui/core';
import WidthFixer from "../../../../components/WidthFixer";
import {PropertyContext} from "../../../../stores/PropertyStore";
import RouteConstants from "../../../../RouteConstants";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.alternate.main,
    },
  },
}))(TableRow);

const Properties = props => {
  const { properties } = useContext(PropertyContext);
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
            Properties <WidthFixer/>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Leased until</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties.map((row) => (
                  <StyledTableRow key={row.id} hover onClick={() => history.push(RouteConstants.editProperty, {property: row})}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>{row.leased_until}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box marginTop={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(RouteConstants.addProperty)}
            >
              Add property
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

Properties.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Properties;
