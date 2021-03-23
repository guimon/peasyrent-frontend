import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  colors,
  Divider,
  Grid,
  Typography,
  NoSsr,
  ListItemIcon,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core';
import { SectionHeader, SwiperImage } from '../../../../components/molecules';
import { CardProduct } from '../../../../components/organisms';

const useStyles = makeStyles(theme => ({
  swiperNavButton: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
  locationCardPrice: {
    padding: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    zIndex: 3,
  },
  fontWeight700: {
    fontWeight: 700,
  },
  image: {
    borderBottomLeftRadius: '40%',
  },
  listItem: {
    padding: 0,
  },
  listItemIcon: {
    minWidth: theme.spacing(3),
    '& i': {
      color: colors.blueGrey[500],
    },
  },
  fontWeight500: {
    fontWeight: 500,
  },
  propertyList: {
    display: 'flex',
  },
  pin: {
    color: `${colors.deepOrange[500]} !important`,
  },
  divider: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}));

const FeaturedProperties = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Available properties"
        subtitle="Contact us to schedule a showing. We'll be happy to walk you through our properties."
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item, index) => (
          <Grid key={index} item xs={12} sm={12} md={4} data-aos="fade-up">
            <CardProduct
              withShadow
              liftUp
              mediaContent={
                <>
                  <SwiperImage
                    navigationButtonStyle={classes.swiperNavButton}
                    items={item.images}
                    imageClassName={classes.image}
                  />
                  <div className={classes.locationCardPrice}>
                    <Typography
                      variant="body1"
                      color="primary"
                      className={classes.fontWeight700}
                    >
                      {item.price}
                    </Typography>
                  </div>
                </>
              }
              cardContent={
                <Grid container spacing={1}>
                  <List disablePadding>
                    <ListItem disableGutters>
                      <ListItemIcon className={classes.listItemIcon}>
                        <NoSsr>
                          <i
                            className={clsx('fas fa-map-marker-alt', classes.pin)}
                          />
                        </NoSsr>
                      </ListItemIcon>
                      <ListItemText primary={item.location} />
                    </ListItem>
                  </List>
                  <Typography
                    color="textPrimary"
                    variant="subtitle1"
                    className={classes.fontWeight500}
                  >
                    {item.address}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Grid container>
                    <Grid item xs={6}>
                      <List disablePadding>
                        <ListItem disableGutters className={classes.listItem}>
                          <ListItemIcon className={classes.listItemIcon}>
                            <NoSsr><i className="fas fa-home" /></NoSsr>
                          </ListItemIcon>
                          <ListItemText primary={item.size} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={6}>
                      <List disablePadding className={classes.propertyList}>
                        <ListItem disableGutters className={classes.listItem}>
                          <ListItemIcon className={classes.listItemIcon}>
                            <NoSsr><i className="fas fa-parking" /></NoSsr>
                          </ListItemIcon>
                          <ListItemText primary={item.garages} />
                        </ListItem>
                        <ListItem disableGutters className={classes.listItem}>
                          <ListItemIcon className={classes.listItemIcon}>
                            <NoSsr><i className="fas fa-bath" /></NoSsr>
                          </ListItemIcon>
                          <ListItemText primary={item.baths} />
                        </ListItem>
                        <ListItem disableGutters className={classes.listItem}>
                          <ListItemIcon className={classes.listItemIcon}>
                            <NoSsr><i className="fas fa-door-open" /></NoSsr>
                          </ListItemIcon>
                          <ListItemText primary={item.rooms} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

FeaturedProperties.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default FeaturedProperties;
