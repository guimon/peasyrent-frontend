import React from 'react';
import { Divider } from '@material-ui/core';
import { SectionAlternate } from '../../components/organisms';
import { Hero, FeaturedProperties, SellProperty } from './components';
import {featuredProperties} from "./data";

const Home = () => {
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
