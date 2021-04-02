import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputAdornment
} from '@material-ui/core';
import {useLocation, useHistory} from "react-router-dom";
import RouteConstants from "../../../../RouteConstants";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  formControl: {
    width: '100%'
  }
}));

const PropertiesForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const location = useLocation();
  const property = location.state ? location.state.property : null;
  console.log(property);
  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h5" color="textPrimary">
            { !property && "Add new property"}
            { property && property.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Name
          </Typography>
          <TextField
            placeholder="Nickname for this property"
            variant="outlined"
            size="medium"
            name="name"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Street address
          </Typography>
          <TextField
            placeholder="Street address"
            variant="outlined"
            size="medium"
            name="address"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Complement
          </Typography>
          <TextField
            placeholder="Complement"
            variant="outlined"
            size="medium"
            name="address_complement"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            City
          </Typography>
          <TextField
            variant="outlined"
            placeholder="City"
            size="medium"
            name="city"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            State
          </Typography>
          <FormControl variant="outlined" className={classes.formControl} >
            <Select value={""}  placeholder="State">
              <MenuItem value="AL">Alabama</MenuItem>
              <MenuItem value="AK">Alaska</MenuItem>
              <MenuItem value="AZ">Arizona</MenuItem>
              <MenuItem value="AR">Arkansas</MenuItem>
              <MenuItem value="CA">California</MenuItem>
              <MenuItem value="CO">Colorado</MenuItem>
              <MenuItem value="CT">Connecticut</MenuItem>
              <MenuItem value="DE">Delaware</MenuItem>
              <MenuItem value="DC">District Of Columbia</MenuItem>
              <MenuItem value="FL">Florida</MenuItem>
              <MenuItem value="GA">Georgia</MenuItem>
              <MenuItem value="HI">Hawaii</MenuItem>
              <MenuItem value="ID">Idaho</MenuItem>
              <MenuItem value="IL">Illinois</MenuItem>
              <MenuItem value="IN">Indiana</MenuItem>
              <MenuItem value="IA">Iowa</MenuItem>
              <MenuItem value="KS">Kansas</MenuItem>
              <MenuItem value="KY">Kentucky</MenuItem>
              <MenuItem value="LA">Louisiana</MenuItem>
              <MenuItem value="ME">Maine</MenuItem>
              <MenuItem value="MD">Maryland</MenuItem>
              <MenuItem value="MA">Massachusetts</MenuItem>
              <MenuItem value="MI">Michigan</MenuItem>
              <MenuItem value="MN">Minnesota</MenuItem>
              <MenuItem value="MS">Mississippi</MenuItem>
              <MenuItem value="MO">Missouri</MenuItem>
              <MenuItem value="MT">Montana</MenuItem>
              <MenuItem value="NE">Nebraska</MenuItem>
              <MenuItem value="NV">Nevada</MenuItem>
              <MenuItem value="NH">New Hampshire</MenuItem>
              <MenuItem value="NJ">New Jersey</MenuItem>
              <MenuItem value="NM">New Mexico</MenuItem>
              <MenuItem value="NY">New York</MenuItem>
              <MenuItem value="NC">North Carolina</MenuItem>
              <MenuItem value="ND">North Dakota</MenuItem>
              <MenuItem value="OH">Ohio</MenuItem>
              <MenuItem value="OK">Oklahoma</MenuItem>
              <MenuItem value="OR">Oregon</MenuItem>
              <MenuItem value="PA">Pennsylvania</MenuItem>
              <MenuItem value="RI">Rhode Island</MenuItem>
              <MenuItem value="SC">South Carolina</MenuItem>
              <MenuItem value="SD">South Dakota</MenuItem>
              <MenuItem value="TN">Tennessee</MenuItem>
              <MenuItem value="TX">Texas</MenuItem>
              <MenuItem value="UT">Utah</MenuItem>
              <MenuItem value="VT">Vermont</MenuItem>
              <MenuItem value="VA">Virginia</MenuItem>
              <MenuItem value="WA">Washington</MenuItem>
              <MenuItem value="WV">West Virginia</MenuItem>
              <MenuItem value="WI">Wisconsin</MenuItem>
              <MenuItem value="WY">Wyoming</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Zip code
          </Typography>
          <TextField
            placeholder="Zip code"
            variant="outlined"
            size="medium"
            name="zip_code"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Beds
          </Typography>
          <TextField
            placeholder="# of beds"
            variant="outlined"
            size="medium"
            name="beds"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Baths
          </Typography>
          <TextField
            placeholder="# of baths"
            variant="outlined"
            size="medium"
            name="baths"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Parking spots
          </Typography>
          <TextField
            placeholder="# of parking spots"
            variant="outlined"
            size="medium"
            name="parking_spots"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Square feet
          </Typography>
          <TextField
            placeholder="634"
            variant="outlined"
            size="medium"
            name="parking_spots"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Price / month
          </Typography>
          <TextField
            placeholder="$800"
            variant="outlined"
            size="medium"
            name="price"
            fullWidth
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          <Box marginRight={2}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              size="large"
              onClick={() => history.push(RouteConstants.properties)}
            >
              back
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

PropertiesForm.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default PropertiesForm;
