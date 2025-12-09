import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Si ya existe, aumentamos la cantidad
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
      toast.info(`Aumentaste la cantidad de ${product.name}`);
    } else {
      // Si no existe, lo agregamos con cantidad 1
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} agregado al carrito`);
    }
  };

  // Función para eliminar un producto
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.warning("Producto eliminado del carrito");
  };
  
  // Función para bajar la cantidad (opcional)
  const decreaseQuantity = (id) => {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct.quantity > 1) {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      removeFromCart(id);
    }
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    toast.error("Carrito vaciado");
  };

  // Calcular total (Precio * Cantidad)
  const total = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  
  // Calcular cantidad total de items (para el numerito en el icono del carrito)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      decreaseQuantity, 
      clearCart, 
      total,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};