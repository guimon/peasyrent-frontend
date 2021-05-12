import React from 'react';
import { Divider, Box } from '@material-ui/core';
import { Hero, FeaturedProperties, SellProperty } from './components';
import PropertiesStore from "../../stores/PropertiesStore";

const Home = () => {
  return (
    <div>
      <Hero />
      <Box m={4} />
      <Divider />
      <PropertiesStore advertised_only={true}>
        <FeaturedProperties />
      </PropertiesStore>
      <SellProperty />
    </div>
  );
}

export default Home;
