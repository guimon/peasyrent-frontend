import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import validate from 'validate.js';
import { LearnMoreLink } from '../../../../components/atoms';
import AuthService from "../../../../services/AuthService";
import {openSnackbar} from "../../../../components/Notifier";
import RouteConstants from "../../../../RouteConstants";
import ErrorHandlerHelper from "../../../../helpers/ErrorHandlerHelper";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
  confirm_password: {
    equality: {
      attribute: "password",
      message: " doesn't match",
    }
  },
};

const Form = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (formState.isValid) {
      const values = queryString.parse(location.search);

      AuthService.saveNewPassword(formState.values.password, values.reset_password_token).then(() => {
        openSnackbar({ message: "New password set successfully! Please login now!",
          variant: 'success', timeout: 3000 });

        setTimeout(() => {
          history.push(RouteConstants.login);
        }, 3000);
      }).catch(error => {
        ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
      });
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder="New password"
              label="New password"
              variant="outlined"
              size="medium"
              name="password"
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              error={hasError('password')}
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Confirm new password"
              label="Confirm new password"
              variant="outlined"
              size="medium"
              name="confirm_password"
              fullWidth
              helperText={
                hasError('confirm_password') ? formState.errors.confirm_password[0] : null
              }
              error={hasError('confirm_password')}
              onChange={handleChange}
              type="password"
              value={formState.values.confirm_password || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant="subtitle2">
                Fields that are marked with * sign are required.
              </Typography>
            </i>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Remember your password?{' '}
              <LearnMoreLink title="Sign in here" href="/login" />
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
