import React from 'react';
import classNames from "classnames";

import { makeStyles } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";

import UserService from "../services/UserService";
import Colors from "../constants/Colors";
import Formatter from "../helpers/Formatter";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '75%',
    minWidth: '50%',
    padding: 10,
    paddingTop: 0,
    position: 'relative',
    marginBottom: 10,
  },
  owner: {
    color: 'rgba(0, 0, 0, 0.58)',
  },
  timestamp: {
    color: 'rgba(0, 0, 0, 0.58)',
    textAlign: 'right',
  },
  received: {
    clear: 'both',
    float: 'left',
    backgroundColor: Colors.backgroundBlue,
    borderRadius: '0px 5px 5px 5px',
    marginLeft: 20,
    '&::after': {
      borderWidth: '0 10px 10px 0',
      borderColor: `transparent ${Colors.backgroundBlue} transparent transparent`,
      borderStyle: 'solid',
      position: 'absolute',
      top: 0,
      left: -10,
      content: '""',
    }
  },
  sent: {
    clear: 'both',
    float: 'right',
    backgroundColor: Colors.backgroundGreen,
    marginRight: 20,
    borderRadius: '5px 0px 5px 5px',
    '&::after': {
      borderWidth: '0px 0 10px 10px',
      borderColor: `transparent transparent transparent ${Colors.backgroundGreen}`,
      borderStyle: 'solid',
      position: 'absolute',
      top: 0,
      right: -10,
      content: '""',
    }
  }
}));

function Message(props){
  const { message, findUser } = props;
  const classes = useStyles();

  const isSender = () => {
    return message.user_id === UserService.getUser().id;
  };

  return (
    <Box className={classNames(classes.root, (isSender() ? classes.sent : classes.received))}>
      <Typography variant={"overline"} className={classes.owner}>
        {findUser(message.user_id).name}
        </Typography>
      <Typography>{message.message}</Typography>
      <Typography component={"div"} variant={"caption"} className={classes.timestamp}>
        {Formatter.formatTimeCalendar(message.created_at)}
      </Typography>
    </Box>
  )
}

export default Message;
