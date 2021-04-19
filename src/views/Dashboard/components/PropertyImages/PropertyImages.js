import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Card,
  CardMedia,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab/Fab";
import {SinglePropertyContext} from "../../../../stores/SinglePropertyStore";
import {openSnackbar} from "../../../../components/Notifier";
import Uploader from "../../../../components/Uploader";

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
  deleteButton: {
    padding: theme.spacing(0, 0),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  deleteContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    width: '100%',
  }
}));

const PropertyImages = props => {
  const { property, savePicture, deletePicture } = useContext(SinglePropertyContext);
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const persistImage = (filename, initialFilename, setLoading) => {
    savePicture(property.id, filename, openSnackbar, () => setLoading(false));
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      {property && property.images.map((image, i) => (
        <Grid key={image.id} item xs={12} sm={4} data-aos="fade-up">
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={image.url}
            >
              <div className={classes.deleteContainer}>
                <Fab
                  color={"secondary"}
                  size="small"
                  aria-label="delete"
                  onClick={() => deletePicture(property.id, image.id, openSnackbar)}
                  title={"Delete picture"}>
                  <DeleteIcon fontSize="small" />
                </Fab>
              </div>
            </CardMedia>
          </Card>
        </Grid>
        ))}
      <Uploader displayStyle={"card"} mimeType="image/*" label="Add picture" callback={persistImage}/>
    </Grid>
  );
};

PropertyImages.propTypes = {

};

export default PropertyImages;
