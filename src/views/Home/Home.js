import React from 'react';
import { Divider, Box } from '@material-ui/core';
import { Hero, FeaturedProperties, SellProperty } from './components';
import PropertyStore from "../../stores/PropertyStore";

const Home = () => {
  return (
    <div>
      <Hero />
      <Box m={4} />
      <Divider />
      <PropertyStore vacant_only={true}>
        <FeaturedProperties />
      </PropertyStore>
      <SellProperty />
    </div>
  );
}

export default Home;
