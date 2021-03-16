import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { Section } from '../../../../components/organisms';

const useStyles = makeStyles(() => ({
  noPaddingBottom: {
    paddingBottom: 0,
  },
  noPaddingTop: {
    paddingTop: 0,
  },
  fontWeight900: {
    fontWeight: 900,
  },
}));

const Hero = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Section className={classes.noPaddingBottom}>
        <SectionHeader
          title={
            <span>
              <Typography component="span" variant="inherit" color="secondary">Ataraxia Properties</Typography>
              <br />
              <span>where integrity meets real estate.</span>
            </span>
          }
          subtitle="Residential properties for rent in Marietta, Ohio."
          align="center"
          disableGutter
          titleVariant="h2"
          titleProps={{ className: classes.fontWeight900 }}
        />
      </Section>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
