import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import validate from 'validate.js';
import { LearnMoreLink } from '../../../../components/atoms';
import store2 from "store2";
import AuthService from "../../../../services/AuthService";
import {openSnackbar} from "../../../../components/Notifier";
import RouteConstants from "../../../../RouteConstants";
import ErrorHandlerHelper from "../../../../helpers/ErrorHandlerHelper";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
};

const Form = () => {
  const history = useHistory();
  const classes = useStyles();

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    formState.values.email = formState.values.email || store2.get('email') || '';
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
      store2.set('email', formState.values.email);
      AuthService.resetPassword(formState.values.email).then(() => {
        let message = "If your email address exists in our database, you will receive a password " +
          "recovery link at your email address in a few minutes.";
        store2.set('email', formState.values.email);
        openSnackbar({ message: message, variant: 'success', timeout: 4000});
        setTimeout(() => {
          history.push(RouteConstants.login);
        }, 4000);
      }).catch(error => {
        ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!");
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
              placeholder="E-mail"
              label="E-mail *"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ''}
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
              Send
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
