import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { ataraxia } from './palette';

const getTheme = () => responsiveFontSizes(
  createMuiTheme({
    palette: ataraxia,
    layout: {
      contentWidth: 1236,
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
