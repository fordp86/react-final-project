import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProductProvider } from './ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
