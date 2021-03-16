import React from 'react'

import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import {Hidden, Typography, useTheme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import MainContainer from "./MainContainer";
import MenuDrawerContent from "./MenuDrawerContent";

const useStyles = makeStyles(theme => ({
  innerGrid: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  flex: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  }
}));

function MainContainerReduced(props) {
  const {children, title} = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <MainContainer>
      <Grid container direction="row" className={classes.grow}>
        <Hidden xsDown>
          <Grid item sm={4} md={3} lg={2} className={classes.flex}>
            <Paper className={classes.grow}>
              <MenuDrawerContent />
            </Paper>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Grid container className={classes.innerGrid} direction="column">
            <Typography variant={"h4"} className={classes.title}>
              {title}
            </Typography>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </MainContainer>
  )
}

export default MainContainerReduced;
