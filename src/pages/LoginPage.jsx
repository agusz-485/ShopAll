import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  // Estado local para el formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple (Requerimiento: Simulacion)
    if (formData.email === 'admin@test.com' && formData.password === '123456') {
      // Simulamos datos de usuario
      const userData = { 
        id: 1, 
        username: 'Admin User', 
        email: formData.email, 
        role: 'admin' 
      };
      
      login(userData); 
      navigate('/dashboard');
    } else {
      alert('Credenciales incorrectas (Usa: admin@test.com / 123456)');
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Login | ShopReact</title>
      </Helmet>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">🔑 Iniciar Sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@test.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="123456"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;