import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from "@material-ui/core";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: `${green[600]}!important`,
  },
  error: {
    backgroundColor: `${theme.palette.error.dark} !important`,
  },
  info: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  warning: {
    backgroundColor: `${amber[900]} !important`,
  },
  icon: {
    fontSize: 24,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
  close: {
    color: '#ffffff'
  }
});

function StyledSnackbarContent(props) {
  const { classes, className, message, variant, onClose, ...other } = props;
  const Icon = variantIcon[variant];

  return (
      <SnackbarContent
          className={classNames(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          {...other}
      />
  );
}

StyledSnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(StyledSnackbarContent);
