import React from 'react'
import PropTypes from "prop-types";
import classNames from "classnames";

import {makeStyles} from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from "@material-ui/core/Fab";


const useStyles = makeStyles(theme => ({
  button: props => ({
    marginTop: props.inline ? 0 : theme.spacing(2),
    marginBottom: props.inline ? 0 : 10,
    marginLeft: props.inline ? 10 : 0,
    marginRight: props.inline ? 10 : 0,
    borderRadius: 20,
    [theme.breakpoints.up('sm')]: {
      alignSelf: 'baseline',
    }
  }),
  red: {
    color: theme.palette.getContrastText(theme.palette.error.dark),
    backgroundColor: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  white: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  progress: {
    color: '#5bb8ef',
    marginRight: 10
  }
}));

function StyledButton(props) {
  const { label, onClick, enabled, loading, danger, info, id } = props;

  const classes = useStyles(props);

  return (
    <Fab
        className={classNames(classes.button, (danger ? classes.red : ''), (info ? classes.white : ''))}
        variant="extended"
        color="primary"
        margin="normal"
        onClick={onClick}
        disabled={!enabled || loading}
        {...(id && { id: id } )}
    >
      {loading && <CircularProgress className={classes.progress} size={16} thickness={5} /> }
      <Typography variant="subtitle1">
        {label}
      </Typography>
    </Fab>
  )
}

StyledButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  loading: PropTypes.bool,
};

StyledButton.defaultProps = {
  loading: false,
  enabled: true,
};

export default StyledButton;
