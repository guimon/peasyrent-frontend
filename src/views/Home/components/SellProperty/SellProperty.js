import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { Section } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: '100%',
    background: theme.palette.primary.dark,
  },
  textWhite: {
    color: 'white',
  },
}));

const SellProperty = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Image src="/building3.png" lazy={false} />
        </Grid>
        <Grid item container alignItems="center" xs={12} md={6}>
          <Section>
            <SectionHeader
              title={
                <span className={classes.textWhite}>
                  Want to Sell Property?
                </span>
              }
              titleVariant="h3"
              subtitle={
                <span className={classes.textWhite}>
                  We buy multi-family residential units, even fixer uppers.
                </span>
              }
              ctaGroup={[
                <Button variant="contained" size="large">
                  Contact us
                </Button>,
              ]}
              align="left"
              disableGutter
              data-aos="fade-up"
            />
          </Section>
        </Grid>
      </Grid>
    </div>
  );
};

SellProperty.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default SellProperty;
