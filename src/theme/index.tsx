import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#878ECD',
    },
    secondary: {
      main: '#DFF4F3',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#FFFFFF',
      paper: '#DDE7F2',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
});

export default theme;
