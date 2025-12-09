import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { toast } from 'react-toastify';

const ProductFormPage = () => {
  const { createProduct, updateProduct, products } = useProducts();
  const navigate = useNavigate();
  const { id } = useParams();

  // 1. Estado del Formulario (Controlado)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: 'https://loremflickr.com/640/480/technics' 
  });

  // 2. Efecto para rellenar el formulario si estamos editando
  useEffect(() => {
    if (id) {
      const productFound = products.find(product => product.id === id);
      if (productFound) {
        setFormData(productFound);
      }
    }
  }, [id, products]);

  // 3. Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 4. Envío y Validaciones
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDACIONES REQUERIDAS ---
    if (!formData.name.trim()) {
      return toast.warning("El nombre es obligatorio");
    }
    if (parseFloat(formData.price) <= 0) {
      return toast.warning("El precio debe ser mayor a 0");
    }
    if (formData.description.length < 10) {
      return toast.warning("La descripción debe tener al menos 10 caracteres");
    }
    // -------------------------------
    let success = false;
    // Decidir si crear o editar
    if (id) {
      // MODO EDICIÓN
      const success = await updateProduct(id, formData);
      if (success) {
        toast.success("Producto actualizado correctamente");
        navigate('/dashboard');
      }
    } else {
      // MODO CREACIÓN
      const success = await createProduct(formData);
      if (success) {
        toast.success("Producto creado correctamente");
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">{id ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label">Nombre del Producto</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Laptop Gamer"
                    autoFocus
                  />
                </div>

                {/* Precio y Categoría (Grid) */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Categoría</label>
                    <select 
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Electrónica">Electrónica</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Hogar">Hogar</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detalles del producto..."
                  ></textarea>
                  <small className="text-muted">Mínimo 10 caracteres.</small>
                </div>

                {/* Botones */}
                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">
                    {id ? 'Actualizar Producto' : 'Guardar Producto'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;