import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import Product from './Product';
import ProductForm from './ProductForm';
import About from './About';
import Welcome from './Welcome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Welcome />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<ProductList />}>
          <Route index element={<p>Select a Product for more details</p>}/>
        </Route>
        <Route path="/products/:productId" element={<Product />}>
          <Route path="*" element={<h1>Product Not Found</h1>} />
        </Route>
        <Route path="new" element={<ProductForm />} />
        <Route path="/products/:productId/edit" element={<ProductForm />} />
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
