import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, total, decreaseQuantity, addToCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <Helmet>
          <title>Mi Carrito | ShopReact</title>
        </Helmet>

        <h2>🛒 Tu carrito está vacío</h2>
        <Link to="/" className="btn btn-primary mt-3">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Mi Carrito | ShopReact</title>
      </Helmet>

      <h2>Tu Carrito de Compras</h2>
      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td className="d-flex align-items-center">
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                  {item.quantity}
                  <button className="btn btn-sm btn-secondary ms-2" onClick={() => addToCart(item)}>+</button>
                </td>
                <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-outline-danger" onClick={clearCart}>Vaciar Carrito</button>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      
      <div className="text-end mt-3">
        <button className="btn btn-success btn-lg">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default CartPage;