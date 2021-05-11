import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import StyledSnackbarContent from "./StyledSnackbarContent";

let openSnackbarFn;

class Notifier extends React.Component {
  state = {
    open: false,
    message: '',
    variant: 'info',
    timeout: 3000
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  componentWillUnmount() {
    openSnackbarFn = null;
  }

  openSnackbar = ({ message, variant, timeout, callback }) => {
    this.setState({
      open: true,
      message,
      variant,
      timeout,
      callback,
    });
  };

  handleSnackbarClose = () => {
    let callback = this.state.callback;
    this.setState({
      open: false,
      message: '',
      timeout: 3000
    });
    if (callback) {
      callback();
    }
  };

  render() {
    return (
        <Snackbar
            open={this.state.open}
            autoHideDuration={this.state.timeout}
            onClose={this.handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <StyledSnackbarContent
              onClose={this.handleSnackbarClose}
              variant={this.state.variant}
              message={this.state.message}
          />
        </Snackbar>
    );
  }
}

export function openSnackbar({ message, variant, timeout, callback }) {
  openSnackbarFn({ message, variant, timeout, callback });
}

export default Notifier;