import React from 'react'

import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 200,
    margin: 10,
  },
  cardButton: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  cardContent: {
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
  },
  icon: {
    verticalAlign: 'bottom',
    marginRight: 5,
  }
});

function ButtonCard(props) {
  const classes = useStyles();
  const { onClick, label, send } = props;

  return (
    <Card className={`${classes.card} blue-gradient`}>
      <CardActionArea onClick={onClick} className={classes.cardButton}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" className={classes.title}>
            { send && <SendIcon fontSize={"large"} className={classes.icon}/> }
            { !send && <AddIcon fontSize={"large"} className={classes.icon}/> }
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ButtonCard;
