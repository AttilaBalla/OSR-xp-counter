import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e88e5'
    },
    secondary: {
      main: '#c0ca33'
    },
    grey: {
      50: '#eceff1',
      100: '#cfd8dc',
      200: '#b0bec5',
      300: '#90a4ae',
      400: '#78909c',
      500: '#607d8b',
      600: '#546e7a',
      700: '#455a64',
      800: '#37474f',
      900: '#263238'
    },
    background: {
      paper: '#37474f',
      default: '#263238'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App/>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
)
