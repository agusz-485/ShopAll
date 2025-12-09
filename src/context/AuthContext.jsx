import { createContext, useState, useEffect, useContext } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el proveedor
export const AuthProvider = ({ children }) => {
  // Inicializamos el estado leyendo de localStorage para persistencia
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Función de Login simulada
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función de Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usar el contexto (¡Buenas prácticas!)
export const useAuth = () => useContext(AuthContext);