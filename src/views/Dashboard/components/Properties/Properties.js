import React, {useState} from 'react';
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
} from '@material-ui/core';
import WidthFixer from "../../../../components/WidthFixer";
import PropertyService from "../../../../services/PropertyService";

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

function createData(name, address, status, leasedUntil) {
  return { name, address, status, leasedUntil };
}

const rows = [
  createData('100 W Spring', '100 W Spring st, Marietta, OH', 'Leased', '05/01/21'),
  createData('50 E Spring', '50 E Spring, Marietta, OH', 'Leased', '12/01/21'),
  createData('75 S Main', '75 S Main, Williamstown, WV', 'Vacant', '-'),
];

const Properties = props => {
  const [image, setImage] = useState();
  PropertyService.index().then(response => { setImage(response.data.data[0].attributes.images[0].url); });
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
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Leased until</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>{row.leasedUntil}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
