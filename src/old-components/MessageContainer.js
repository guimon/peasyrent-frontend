import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";

import Message from "./Message";
import StyledButton from "./StyledButton";
import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import {openSnackbar} from "./Notifier";
import InviteMessageService from "../services/InviteMessageService";
import SecondarySubtitleText from "./SecondarySubtitleText";
import {SingleInviteContext} from "../stores/SingleInviteStore";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 16,
  },
  container: {
    padding: 10,
  },
  sendBox: {
    clear: 'both',
    display: 'flex',
    flexDirection: 'row'
  },
  input: {
    width: '100%',
  },
  expandable: {
    flex: 1,
  }
}));

function MessageContainer(props){
  const { invite } = props;
  const { messages } = invite;
  const { setInvite } = useContext(SingleInviteContext);

  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");

  const findUser = (user_id) => {
    if (invite.inviter.user_id === user_id) {
      return invite.inviter;
    } else {
      return invite.invited_friends[0];
    }
  };

  const history = useHistory();

  useEffect(() => {
    InviteMessageService.updateViewedTime(invite.id, invite.messages[invite.messages.length-1].created_at).then(response => {

    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, 'Error loading data, please try again later!');
    });
  }, [invite, history]);

  const sendNewMessage = () => {
    InviteMessageService.sendNewMessage(invite.id, newMessage).then(response => {
      setNewMessage("");
      setInvite(response.data.data.attributes);
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, 'Error loading data, please try again later!');
    });
  };

  return (
    <Grid item sm={12} md={6} className={classes.root}>
      <SecondarySubtitleText label={"Messages"} paddingBottom={1}/>
      <Paper className={classes.container}>
        {messages.map((message) => (
          <Message {...{message, findUser}} key={`message_${message.id}`}/>
        ))}

        <Grid className={classes.sendBox}>
          <Grid item className={classes.expandable}>
            <TextField variant="outlined" multiline={true} className={classes.input} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
          </Grid>
          <Grid item>
            <StyledButton inline onClick={sendNewMessage} label={"Send"} enabled={true}/>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default MessageContainer;
