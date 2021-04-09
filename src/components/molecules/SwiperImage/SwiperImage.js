import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Swiper from 'swiper';

import { Image } from '../../atoms';
import {Dialog} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 'auto',
  },
  swiperSlide: {
    width: 'auto',
  },
  swiperNav: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 88,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 4,
    '& .swiper-button-prev, & .swiper-button-next': {
      width: theme.spacing(3),
      height: theme.spacing(3),
      padding: theme.spacing(2),
      background: theme.palette.primary.main,
      borderRadius: '100%',
      position: 'relative',
      boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
      border: `2px solid ${theme.palette.background.paper}`,
      '&:after': {
        fontSize: 'initial',
        color: theme.palette.background.paper,
      },
    },
    '& .swiper-button-prev': {
      left: 0,
    },
    '& .swiper-button-next': {
      right: 0,
    },
  },
  image: {
    objectFit: 'cover',
  },
  paperDialog: {
    height: '100%'
  }
}));

/**
 * Component to display the image swiper
 *
 * @param {Object} props
 */
const SwiperImage = props => {
  const {
    items,
    navigationButtonStyle,
    imageClassName,
    className,
    maxSize,
    ...rest
  } = props;

  const classes = useStyles();
  const [url, setUrl] = React.useState();

  React.useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-container .swiper-button-next',
        prevEl: '.swiper-container .swiper-button-prev',
      }
    });
  }, []);

  return (
    <div
      className={clsx(
        'swiper-container',
        'swiper-image',
        classes.root,
        className,
      )}
      {...rest}
    >
      <Dialog
        fullWidth={true}
        maxWidth={maxSize}
        open={url != null}
        onClose={() => setUrl(null)}
        classes={{ paper: classes.paperDialog}}
      >
        <div style={{
          backgroundImage: `url('${url}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          height:'100%'}}
        ></div>
      </Dialog>
      <div className="swiper-image__wrapper, swiper-wrapper">
        {items.map((item, index) => (
          <div
            className={clsx(
              'swiper-image__slide',
              'swiper-slide',
              classes.swiperSlide,
            )}
            key={index}
          >
            <Image
              src={item.src || item.url}
              alt={item.alt || item.description}
              srcSet={item.srcSet}
              lazyProps={{ width: '100%', height: '100%' }}
              className={clsx(
                'swiper-image__item',
                classes.image,
                imageClassName ? imageClassName : {},
              )}
              onClick={(e) => { setUrl(e.target.src) }}
            />
          </div>
        ))}
      </div>
      <div className={clsx('swiper-image__navigation', classes.swiperNav)}>
        <div
          className={clsx(
            'swiper-image__navigation-button',
            'swiper-image__navigation-button--prev',
            'swiper-button-prev',
            navigationButtonStyle || {},
          )}
        />
        <div
          className={clsx(
            'swiper-image__navigation-button',
            'swiper-image__navigation-button--next',
            'swiper-button-next',
            navigationButtonStyle || {},
          )}
        />
      </div>
    </div>
  );
};

SwiperImage.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * External classes for the images
   */
  imageClassName: PropTypes.string,
  /**
   * The array of images object which should consist of src, alt and srcset attributes
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Styles classes of the navigation button
   */
  navigationButtonStyle: PropTypes.string,
};

export default SwiperImage;
