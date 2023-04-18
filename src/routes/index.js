import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Orders from '../pages/Admin/Orders';

import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Details from '../pages/Details';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyList from '../pages/MyList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/desejos" element={<MyList />} />
      <Route path="/pedidos" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route path="carrinho" element={<Cart />} />
      <Route path="detalhes" element={<Details />} />
      <Route path="checkout" element={<Checkout />} />
      {/*  <Route path="*" element={() => <h1>teste</h1>} /> */}
    </Routes>
  );
}

export default AppRoutes;