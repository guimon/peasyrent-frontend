import React, {useContext} from 'react';
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
  InputAdornment,
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import RouteConstants from "../../../../RouteConstants";
import FieldLabel from "../../../../components/FieldLabel";
import FieldText from "../../../../components/FieldText";
import {SinglePropertyContext} from "../../../../stores/SinglePropertyStore";
import {openSnackbar} from "../../../../components/Notifier";
import PropertyImages from "../PropertyImages/PropertyImages";
import {Controller, useForm} from "react-hook-form";
import {StripeAccountsContext} from "../../../../stores/StripeAccountsStore";

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
  const { property, saveProperty, updateProperty, deleteProperty } = useContext(SinglePropertyContext);
  const { stripeAccounts } = useContext(StripeAccountsContext);
  const { handleSubmit, control } = useForm({ defaultValues: property });

  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = (data) => {
    if (property.id) {
      updateProperty(data, openSnackbar);
    } else {
      saveProperty(data, openSnackbar);
    }
  };

  const destroy = () => {
    deleteProperty(property, openSnackbar, () => history.push(RouteConstants.properties));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  placeholder="Nickname for this property"
                />
              }
              name="name"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={9}>
            <FieldLabel label={"Street address"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  placeholder="Street address"
                />
              }
              name="street_address"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldLabel label={"Complement"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  placeholder="Complement"
                />
              }
              name="address_complement"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FieldLabel label={"City"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  placeholder="City"
                />
              }
              name="city"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"State"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FormControl variant="outlined" className={classes.formControl} error={!!error}>
                  <Select
                      placeholder="State"
                      value={field.value}
                      onChange={field.onChange}
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
                </FormControl>
              }
              name="state"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldLabel label={"Zip Code"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  placeholder="Zip code"
                />
              }
              name="zip_code"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Beds"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  type="number"
                  placeholder="# of bedrooms"
                />
              }
              name="beds"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Baths"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  type="number"
                  placeholder="# of baths"
                />
              }
              name="baths"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Parking spots"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  type="number"
                  placeholder="# of parking spots"
                />
              }
              name="parking_spots"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Square feet"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  type="number"
                  placeholder="634"
                />
              }
              name="square_footage"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Price / Month"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  type="number"
                  placeholder="800"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              }
              name="price"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Active"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FormControl variant="outlined" className={classes.formControl} error={!!error}>
                  <Select
                    placeholder="Active"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <MenuItem value={"true"}>Yes</MenuItem>
                    <MenuItem value={"false"}>No</MenuItem>
                  </Select>
                </FormControl>
              }
              name="active"
              rules={{ required: true }}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FieldLabel label={"Description"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FieldText
                  field={field}
                  errorState={error}
                  type="text"
                  placeholder="Describe the property"
                  rows={4}
                  multiline={true}
                />
              }
              name="description"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FieldLabel label={"Stripe account to receive rent"}/>
            <Controller
              render={({ field,  fieldState: { error } }) =>
                <FormControl variant="outlined" className={classes.formControl} error={!!error}>
                  <Select
                    placeholder="Stripe account"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {stripeAccounts.map((stripeAccount) => (
                      <MenuItem key={`stripe-account-${stripeAccount.id}`} value={stripeAccount.id}>{stripeAccount.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
              name="stripe_account_id"
              rules={{ required: true }}
              control={control}
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
          <Grid item container justify="flex-start" xs={8}>
            <Box marginRight={2}>
              <Button
                variant="outlined"
                type="button"
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
          {property.id &&
            <Grid item container justify="flex-end" xs={4}>
              <Box>
                <Button
                  variant="outlined"
                  type="button"
                  color="secondary"
                  size="large"
                  onClick={() => destroy()}
                >
                  delete
                </Button>
              </Box>
            </Grid>
          }
        </Grid>
      </div>
    </form>
  );
};

PropertiesForm.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default PropertiesForm;
