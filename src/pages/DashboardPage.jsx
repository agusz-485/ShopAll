import React from 'react';
import { useProducts } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 

const DashboardPage = () => {
  const { products, loading, deleteProduct } = useProducts();

  if (loading) return <div className="text-center mt-5"><h2>Cargando productos... ⏳</h2></div>;

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Admin Dashboard | ShopReact</title>
      </Helmet>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Gestión de Productos</h2>
        <Link to="/dashboard/new" className="btn btn-success">
          + Nuevo Producto
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><span className="badge bg-secondary">{product.category}</span></td>
                <td>
                  <Link 
                    to={`/dashboard/edit/${product.id}`} 
                    className="btn btn-sm btn-warning me-2"
                  >
                    ✏️
                  </Link>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if(window.confirm('¿Seguro que quieres eliminar este producto?')) {
                        deleteProduct(product.id);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
            <p className="text-center mt-3">No hay productos. ¡Agrega uno!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;