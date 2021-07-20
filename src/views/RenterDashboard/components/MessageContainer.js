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
import {IconButton, List, useMediaQuery, CircularProgress} from "@material-ui/core";
import Send from '@material-ui/icons/Send';
import Uploader from "../../../components/Uploader";
import FieldLabel from "../../../components/FieldLabel";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    marginTop: 16
  },
  list: {
    overflow: 'auto',
    maxHeight: '50vh',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  innerContainer: {
    padding: 10,
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
  upload: {
    marginRight: 12
  },
}));

function MessageContainer(props){
  const { messages, sendNewMessage, lease_id } = useContext(MessagesContext);

  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const [sendLoading, setSendLoading] = useState(false);

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

  const postMessage = () => {
    setSendLoading(true);
    sendNewMessage(newMessage, null, setSendLoading);
    setNewMessage('');
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        <Paper elevation={2} className={classes.container}>
          {messages.length === 0 &&
          <FieldLabel label={`No messages so far`}/>
          }
          <List className={classes.list}>
            {messages.map((message) => (
              <Message {...{message}} key={`message_${message.id}`}/>
            ))}
          </List>
          <div className={classes.clearBox} />
          <Paper elevation={2} className={classes.innerContainer}>
            <Grid className={classes.sendBox}>
              <Grid item className={classes.upload}>
                <Uploader displayStyle={"icon"} mimeType="image/*" label="Upload picture" callback={persistImage}/>
              </Grid>
              <Grid item className={classes.expandable}>
                <TextField variant="outlined" id="new_message" multiline={true} className={classes.input} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
              </Grid>
              <Grid item>
                { sendLoading && <CircularProgress color={"primary"}/> }
                {!sendLoading &&
                  <IconButton aria-label="send" component="span" onClick={postMessage} title={"Send"} id="send_button">
                    <Send fontSize="large" color={"primary"} />
                  </IconButton>
                }
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MessageContainer;
