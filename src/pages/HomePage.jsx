import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet'; 
import { GradientTitle, PriceTag, ProductCard, ActionButton } from '../styles/StyledComponents'; 
const HomePage = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  // --- ESTADOS LOCALES PARA UI ---
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  // --- LÓGICA DE FILTRADO (Buscador) ---
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- LÓGICA DE PAGINACIÓN ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      
      <Helmet>
        <title>Inicio | ShopAll</title>
        <meta name="description" content="El mejor catálogo de productos con React" />
      </Helmet>

      
      <GradientTitle>🛍️ Bienvenido a ShopAll</GradientTitle>

      {/* --- BARRA DE BÚSQUEDA --- */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">🔍</span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar por nombre o categoría..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
            />
          </div>
        </div>
      </div>

      
      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center">
          No se encontraron productos que coincidan con "{searchTerm}"
        </div>
      ) : (
        <div className="row">
          {currentProducts.map(product => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
              
              {/* Usamos nuestro ProductCard en lugar de <div className="card"> */}
              <ProductCard>
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{product.name}</h5>
                  <p className="card-text text-muted small">{product.description.substring(0, 80)}...</p>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-light text-dark border">{product.category}</span>
                      {/* Usamos nuestro PriceTag */}
                      <PriceTag>${product.price}</PriceTag>
                    </div>
                    
                    {/* Usamos nuestro ActionButton */}
                    <ActionButton primary onClick={() => handleAddToCart(product)}>
                      Añadir al Carrito 🛒
                    </ActionButton>
                  </div>
                </div>
              </ProductCard>

            </div>
          ))}
        </div>
      )}

      {/* --- PAGINACIÓN --- */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {/* Botón Anterior */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>Anterior</button>
            </li>

            {/* Números de página */}
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Botón Siguiente */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Siguiente</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HomePage;