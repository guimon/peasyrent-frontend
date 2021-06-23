import React from 'react';
import classNames from "classnames";
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Image } from '../../../components/atoms';
import UserService from "../../../services/UserService";

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
    backgroundColor: '#ddeeff',
    borderRadius: '0px 5px 5px 5px',
    marginLeft: 20,
    '&::after': {
      borderWidth: '0 10px 10px 0',
      borderColor: `transparent #ddeeff transparent transparent`,
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
    backgroundColor: '#ddffdd',
    marginRight: 20,
    borderRadius: '5px 0px 5px 5px',
    '&::after': {
      borderWidth: '0px 0 10px 10px',
      borderColor: `transparent transparent transparent #ddffdd`,
      borderStyle: 'solid',
      position: 'absolute',
      top: 0,
      right: -10,
      content: '""',
    }
  }
}));

function Message(props){
  const { message } = props;
  const classes = useStyles();

  const isSender = () => {
    return message.user_id === UserService.getUser().id;
  };

  return (
    <Box className={classNames(classes.root, (isSender() ? classes.sent : classes.received))}>
      <Typography variant={"overline"} className={classes.owner}>
        {message.sender }
      </Typography>
      {message.message && <Typography>{message.message}</Typography>}
      {message.image_url && <div>
        <a href={message.image_url} target="_blank" rel="noreferrer">
          <Image
            src={message.image_url}
            className={classes.image}
          />
        </a>
      </div>
      }
      <Typography component={"div"} variant={"caption"} className={classes.timestamp}>
        {moment(message.created_at).calendar()}
      </Typography>
    </Box>
  )
}

export default Message;
