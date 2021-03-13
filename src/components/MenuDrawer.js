import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import MenuDrawerContent from "./MenuDrawerContent";

const useStyles = makeStyles({
  toolbar: theme => theme.mixins.toolbar,
});

function MenuDrawer(props){
  const theme = useTheme();
  const classes = useStyles(theme);

  const {open, closeCallback, variant} = props;

  return (
    <Drawer anchor="right" open={open} onClose={closeCallback()} variant={variant}>
      <div
          className={classes.list}
          role="presentation"
          onClick={closeCallback()}
          onKeyDown={closeCallback()}
      >
        <MenuDrawerContent/>
      </div>
    </Drawer>
  )
}

export default MenuDrawer;
