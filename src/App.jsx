import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import AppRouter from './routes/AppRouter';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <AuthProvider>
      <ProductsProvider> 
         <CartProvider> 
           <Navbar />
           <AppRouter />
           <ToastContainer position="bottom-right" />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;