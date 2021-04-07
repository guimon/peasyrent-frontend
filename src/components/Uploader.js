import React, {useContext, useRef, useState} from 'react';
import FileService from "../services/FileService";
import {openSnackbar} from "./Notifier";
import S3Service from "../services/S3Service";
import UploadIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab/Fab";
import {SinglePropertyContext} from "../stores/SinglePropertyStore";
import {Card, CardMedia, Grid, CircularProgress, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0 7px 14px 0 rgba(0, 0, 0, 0.1)',
  },
  cardMedia: {
    minHeight: 280,
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
  },
  addContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    width: '100%',
  }
}));

const Uploader = props => {
  const { property, savePicture } = useContext(SinglePropertyContext);
  const [loading, setLoading] = useState(false);
  const uploadInputRef = useRef(null);
  const classes = useStyles();

  const upload = (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      setLoading(true);
      let file = ev.target.files[0];
      // gets the S3 url from the backend
      FileService.getUrl(file.name).then(response => {
        let filename = response.data.filename;
        // uploads the file to S3
        S3Service.upload(file.name, response.data.url, file).then(s3Response => {
          //  tells the backend to save the file in the property
          savePicture(property.id, filename, openSnackbar, () => setLoading(false));
        })
        .catch(error => {
          setLoading(false);
          openSnackbar({ message: 'Upload failed. Please try again later.', variant: 'error', timeout: 5000 });
        })
      })
      .catch(error => {
        setLoading(false);
        openSnackbar({ message: 'Upload failed. Please try again later.', variant: 'error', timeout: 5000 });
      })
    }
  };

  return (
    <Grid key={"add image"} item xs={12} sm={4} data-aos="fade-up">
      <Card className={classes.card}>
        <CardMedia className={classes.cardMedia}>

          <div className={classes.addContainer}>
            { loading && <CircularProgress color={"primary"}/> }
            {!loading &&
            <>
              <input onChange={upload} accept="image/*" type="file" ref={uploadInputRef} hidden/>
              <Fab
                color={"primary"}
                size="small"
                aria-label="add"
                title={"Add picture"}
                onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
              >
                <UploadIcon/>
              </Fab>
            </>
            }
          </div>
        </CardMedia>
      </Card>
    </Grid>
  );
}
export default Uploader;