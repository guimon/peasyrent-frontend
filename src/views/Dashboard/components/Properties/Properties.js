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
  Box, Hidden,
} from '@material-ui/core';
import WidthFixer from "../../../../components/WidthFixer";
import {PropertiesContext} from "../../../../stores/PropertiesStore";
import RouteConstants from "../../../../RouteConstants";
import {useHistory} from "react-router-dom";
import StyledTableCell from '../../../../components/StyledTableCell'
import StyledTableRow from '../../../../components/StyledTableRow'
import StyledTableBody from '../../../../components/StyledTableBody'
import moment from "moment";
import {CardBase} from "../../../../components/organisms";
import StyledTableHead from "../../../../components/StyledTableHead";
import StyledTable from "../../../../components/StyledTable";

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
}));

const Properties = props => {
  const { properties } = useContext(PropertiesContext);
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
              Properties <WidthFixer/>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <StyledTable className={classes.table}>
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <Hidden smDown>
                      <StyledTableCell>Address</StyledTableCell>
                    </Hidden>
                    <StyledTableCell>Advertised</StyledTableCell>
                    <StyledTableCell>Leased until</StyledTableCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {properties.map((row) => (
                    <StyledTableRow key={row.id} hover onClick={() => history.push(RouteConstants.editProperty + row.id)}>
                      <StyledTableCell>
                        {row.name}
                      </StyledTableCell>
                      <Hidden smDown>
                        <StyledTableCell>{row.address}</StyledTableCell>
                      </Hidden>
                      <StyledTableCell>{row.advertised ? "Yes" : "No"}</StyledTableCell>
                      <StyledTableCell>{row.leased_until ?  moment(row.leased_until, "YYYY-MM-DD").format("ddd MMM DD YYYY") : 'Vacant'}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </StyledTableBody>
              </StyledTable>
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
    </CardBase>
  );
};

Properties.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Properties;
