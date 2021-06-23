import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";

import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";

import Message from "./Message";
import ErrorHandlerHelper from "../../../helpers/ErrorHandlerHelper";
import {MessagesContext} from "../../../stores/MessagesStore";
import {openSnackbar} from "../../../components/Notifier";
import MessageService from "../../../services/MessageService";
import {IconButton, Typography, List, useMediaQuery} from "@material-ui/core";
import Send from '@material-ui/icons/Send';
import Uploader from "../../../components/Uploader";
import FieldLabel from "../../../components/FieldLabel";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 10,
    backgroundColor: '#f7f7f7'
  },
  sendBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  subtitle: {
    marginBottom: 12
  },
  clearBox: {
    clear: 'both',
  },
  input: {
    width: '100%',
  },
  expandable: {
    flex: 1,
    marginRight: 12
  },
}));

function MessageContainer(props){
  const { propertyName } = props;
  const { messages, sendNewMessage, lease_id } = useContext(MessagesContext);

  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");

  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    if (messages && messages.length > 0) {
      MessageService.updateViewedTime(lease_id, messages[0].created_at).catch(error => {
        ErrorHandlerHelper(error, history, openSnackbar, 'Error loading data, please try again later!');
      });
    }
  }, [lease_id, messages, history]);

  const persistImage = (filename, _, setLoading) => {
    sendNewMessage(null, filename, setLoading);
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        <Typography color="textPrimary" className={classes.subtitle}>
          {propertyName && `Lease on ${propertyName}`}
        </Typography>

        {messages.length === 0 &&
          <FieldLabel label={`No messages so far`}/>
        }
        {messages.length === 1 &&
          <FieldLabel label={`1 Message`}/>
        }
        {messages.length > 1 &&
          <FieldLabel label={`Messages: ${messages.length}`}/>
        }

        <Paper elevation={2} className={classes.container}>
          <Grid className={classes.sendBox}>
            <Grid item>
              <Uploader displayStyle={"icon"} mimeType="image/*" label="Upload picture" callback={persistImage}/>
            </Grid>
            <Grid item className={classes.expandable}>
              <TextField variant="outlined" multiline={true} className={classes.input} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
            </Grid>
            <Grid item>
              <IconButton aria-label="send" component="span" onClick={() => { sendNewMessage(newMessage); setNewMessage("") }} title={"Send"}>
                <Send fontSize="large" color={"primary"} />
              </IconButton>
            </Grid>
          </Grid>
          <List>
            {messages.map((message) => (
              <Message {...{message}} key={`message_${message.id}`}/>
            ))}
          </List>
          <div className={classes.clearBox} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MessageContainer;
