import { createTheme, responsiveFontSizes } from '@material-ui/core';
import { ataraxia } from './palette';

const getTheme = () => responsiveFontSizes(
  createTheme({
    palette: ataraxia,
    layout: {
      contentWidth: 1600,
    },
    typography: {
      fontFamily: 'Lato',
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  }),
);

export default getTheme;
