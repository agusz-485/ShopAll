import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import ProductFormPage from '../pages/ProductFormPage';
import CartPage from '../pages/CartPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas Privadas (Agrupadas) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/new" element={<ProductFormPage />} /> 
        <Route path="/dashboard/edit/:id" element={<ProductFormPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      
      {/* Ruta 404 por si acaso */}
      <Route path="*" element={<h1 className='text-center mt-5'>404 - Página no encontrada</h1>} />
    </Routes>
  );
};

export default AppRouter;