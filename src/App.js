import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FullStory from 'react-fullstory';
import HttpsRedirect from 'react-https-redirect';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import 'swiper/css/swiper.min.css';
import 'aos/dist/aos.css';
import './assets/css/index.css';

import Routes from "./Routes";
import Notifier from "./components/Notifier";

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <HttpsRedirect>
      <Router history={browserHistory}>
        <FullStory org={process.env.REACT_APP_FULLSTORY_ORG}/>
        <Routes />
        <Notifier/>
      </Router>
    </HttpsRedirect>
  );
}

export default App;