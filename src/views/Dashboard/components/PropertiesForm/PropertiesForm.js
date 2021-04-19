import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputAdornment, FormHelperText
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import RouteConstants from "../../../../RouteConstants";
import FieldLabel from "../../../../components/FieldLabel";
import FieldText from "../../../../components/FieldText";
import {SinglePropertyContext} from "../../../../stores/SinglePropertyStore";
import {openSnackbar} from "../../../../components/Notifier";
import PropertyImages from "../PropertyImages/PropertyImages";

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
  const { property, saveProperty, updateProperty } = useContext(SinglePropertyContext);
  const [errors, setErrors] = useState({});

  const [name, setName] = useState(property.name || '');
  const [streetAddress, setStreetAddress] = useState(property.street_address || '');
  const [addressComplement, setAddressComplement] = useState(property.address_complement || '');
  const [city, setCity] = useState(property.city || '');
  const [state, setState] = useState(property.state || '');
  const [zipCode, setZipCode] = useState(property.zip_code || '');
  const [beds, setBeds] = useState(property.beds || 0);
  const [baths, setBaths] = useState(property.baths || 0);
  const [squareFootage, setSquareFootage] = useState(property.square_footage || 0);
  const [parkingSpots, setParkingSpots] = useState(property.parking_spots || 0);
  const [price, setPrice] = useState(property.price || 0);
  const [description, setDescription] = useState(property.description || '');

  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const updatePropertyWithState = () => {
    property.name = name;
    property.street_address = streetAddress;
    property.address_complement = addressComplement;
    property.city = city;
    property.state = state;
    property.zip_code = zipCode;
    property.beds = beds;
    property.baths = baths;
    property.square_footage = squareFootage;
    property.parking_spots = parkingSpots;
    property.price = price;
    property.description = description;
  };

  const validate = () => {
    let newErrors = {};

    if (!name) { newErrors.name = 'Nickname is required'; }
    if (!streetAddress) { newErrors.streetAddress = 'Street Address is required'; }
    if (!city) { newErrors.city = 'City is required'; }
    if (!state) { newErrors.state = 'State is required'; }
    if (!zipCode) { newErrors.zipCode = 'Zip code is required'; }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    if (validate()) {
      updatePropertyWithState();
      if (property.id) {
        updateProperty(property, openSnackbar);
      } else {
        saveProperty(property, openSnackbar);
      }
    }
  };

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
          <FieldLabel label={"Name"}/>
          <FieldText
            placeholder="Nickname for this property"
            name="name"
            type="text"
            value={name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={9}>
          <FieldLabel label={"Street address"}/>
          <FieldText
            placeholder="Street address"
            name="street_address"
            type="text"
            value={streetAddress}
            error={!!errors.streetAddress}
            helperText={errors.streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FieldLabel label={"Complement"}/>
          <FieldText
            placeholder="Complement"
            name="address_complement"
            value={addressComplement}
            onChange={(e) => setAddressComplement(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <FieldLabel label={"City"}/>
          <FieldText
            placeholder="City"
            name="city"
            type="text"
            value={city}
            error={!!errors.city}
            helperText={errors.city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"State"}/>
          <FormControl variant="outlined" className={classes.formControl} error={!!errors.state}>
            <Select
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
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
            <FormHelperText>{errors.state}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FieldLabel label={"Zip Code"}/>
          <FieldText
            placeholder="Zip code"
            name="zip_code"
            type="text"
            value={zipCode}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Beds"}/>
          <FieldText
            placeholder="# of bedrooms"
            name="beds"
            type="number"
            value={beds}
            error={!!errors.beds}
            helperText={errors.beds}
            onChange={(e) => setBeds(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Baths"}/>
          <FieldText
            placeholder="# of baths"
            name="baths"
            type="number"
            value={baths}
            error={!!errors.baths}
            helperText={errors.baths}
            onChange={(e) => setBaths(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Parking spots"}/>
          <FieldText
            placeholder="# of parking spots"
            name="parking_spots"
            type="number"
            value={parkingSpots}
            onChange={(e) => setParkingSpots(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Square feet"}/>
          <FieldText
            placeholder="634"
            name="square_footage"
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FieldLabel label={"Price / Month"}/>
          <FieldText
            placeholder="800"
            name="price"
            value={price/100.0}
            error={!!errors.price}
            helperText={errors.price}
            onChange={(e) => setPrice(e.target.value*100)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <FieldLabel label={"Description"}/>
          <FieldText
            placeholder="Describe the property"
            name="description"
            type="text"
            rows={4}
            multiline={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        { property.id &&
          <>
            <Grid item xs={12}>
              <FieldLabel label={"Pictures"}/>
              <PropertyImages />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        }
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
              onClick={() => save()}
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
