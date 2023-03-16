import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import AppRoutes from './routes';

import Menu from './components/Menu';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <CssBaseline />
          <Menu />
          <AppRoutes />
          <ToastContainer />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
