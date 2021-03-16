import React from 'react';
import { Divider, Button, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { SectionAlternate } from '../../components/organisms';
import { Hero, FeaturedProperties, SellProperty } from './components';
import {featuredProperties} from "./data";

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
}));

const Home = ({ }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <div>
      <Hero />
      <Divider />
      <SectionAlternate>
        <FeaturedProperties data={featuredProperties} />
      </SectionAlternate>
      <SellProperty />
    </div>
  );
}

export default Home;
