import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './App/store';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import '../src/flags.css'

import "primereact/resources/themes/arya-orange/theme.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);

