import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Box,
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import RouteConstants from "../../../../RouteConstants";
import FieldLabel from "../../../../components/FieldLabel";
import FieldText from "../../../../components/FieldText";
import {SingleStripeAccountContext} from "../../../../stores/SingleStripeAccountStore";
import {openSnackbar} from "../../../../components/Notifier";

import {Controller, useForm} from "react-hook-form";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  formControl: {
    width: '100%'
  }
}));

const StripeAccountsForm = props => {
  const { stripeAccount, saveStripeAccount, updateStripeAccount, deleteStripeAccount } = useContext(SingleStripeAccountContext);
  const { handleSubmit, control } = useForm({ defaultValues: stripeAccount });
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (data) => {
    if (stripeAccount.id) {
      updateStripeAccount(data, openSnackbar, () => history.push(RouteConstants.stripeAccounts));
    } else {
      saveStripeAccount(data, openSnackbar, () => history.push(RouteConstants.stripeAccounts));
    }
  };

  const destroy = () => {
    if (stripeAccount.id) {
      deleteStripeAccount(stripeAccount, openSnackbar, () => history.push(RouteConstants.stripeAccounts));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <FieldLabel label={"Stripe Account name"}/>
          <Controller
            render={({ field,  fieldState: { error } }) =>
              <FieldText
                field={field}
                errorState={error}
              />
            }
            name="name"
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldLabel label={"Publishable key"}/>
          <Controller
            render={({ field,  fieldState: { error } }) =>
              <FieldText
                field={field}
                errorState={error}
              />
            }
            name="publishable_prod_api_key"
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldLabel label={"Secret key"}/>
          <Controller
            render={({ field,  fieldState: { error } }) =>
              <FieldText
                field={field}
                errorState={error}
              />
            }
            name="prod_api_key"
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldLabel label={"Test Publishable key"}/>
          <Controller
            render={({ field,  fieldState: { error } }) =>
              <FieldText
                field={field}
                errorState={error}
              />
            }
            name="publishable_test_api_key"
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldLabel label={"Test Secret key"}/>
          <Controller
            render={({ field,  fieldState: { error } }) =>
              <FieldText
                field={field}
                errorState={error}
              />
            }
            name="test_api_key"
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        <Grid item container justify="flex-start" xs={8}>
          <Box marginRight={2}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              size="large"
              onClick={() => history.push(RouteConstants.stripeAccounts)}
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
      </Grid>
    </form>
  );
};

StripeAccountsForm.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default StripeAccountsForm;
