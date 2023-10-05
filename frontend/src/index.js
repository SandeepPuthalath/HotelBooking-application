import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './redux/app/store';
import ErrorBoundary from './util/ErrorBundary';
import ErrorPage from './pages/ErrorPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary fallback={<ErrorPage/>}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
