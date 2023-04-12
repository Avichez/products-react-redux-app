import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { MainPage } from './components/MainPage';
import { Header } from './components/Header';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/home' element={<Navigate to='/' />} />
          <Route path='/products' element={<ProductsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
