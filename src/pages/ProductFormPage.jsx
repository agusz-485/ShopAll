import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { toast } from 'react-toastify';
import { uploadImageToImgBB } from '../services/UploadService';

const ProductFormPage = () => {
  const { createProduct, updateProduct, products } = useProducts();
  const navigate = useNavigate();
  const { id } = useParams();


  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '' 
  });

  useEffect(() => {
    if (id) {
      const productFound = products.find(product => product.id === id);
      if (productFound) {
        setFormData(productFound);
      }
    }
  }, [id, products]);


  useEffect(() => {
    return () => {
      if (formData.image && formData.image.startsWith && formData.image.startsWith('blob:')) {
        try { URL.revokeObjectURL(formData.image); } catch (e) {}
      }
    };
  }, []);

  // Manejador para textos normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Manejador exclusivo para el archivo de imagen ---
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (formData.image && formData.image.startsWith && formData.image.startsWith('blob:')) {
        try { URL.revokeObjectURL(formData.image); } catch (e) {}
      }
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setFormData({ ...formData, image: preview });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim()) return toast.warning("El nombre es obligatorio");
    if (parseFloat(formData.price) <= 0 || Number.isNaN(parseFloat(formData.price))) return toast.warning("El precio debe ser mayor a 0");
    if ((formData.description || '').length < 10) return toast.warning("La descripción es muy corta");
    if (!formData.image && !selectedFile) return toast.warning("Debes subir una imagen");

    setIsUploading(true); 
    let finalImageUrl = formData.image;

    try {
      if (selectedFile) {
        const toastId = toast.loading("Subiendo imagen a la nube... ☁️");
        finalImageUrl = await uploadImageToImgBB(selectedFile);
        toast.dismiss(toastId);
      }


      const productData = { ...formData, image: finalImageUrl };

      let success = false;
      if (id) {
        success = await updateProduct(id, productData);
        if (success) toast.success("Producto actualizado correctamente");
      } else {
        success = await createProduct(productData);
        if (success) toast.success("Producto creado correctamente");
      }

      if (success) navigate('/dashboard');

    } catch (error) {
      console.error(error);
      toast.error("Error al subir la imagen o guardar el producto. Intenta de nuevo.");
    } finally {
      setIsUploading(false); // Desbloqueamos botón
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
                    autoFocus
                  />
                </div>

                {/* --- SECCIÓN DE IMAGEN ACTUALIZADA --- */}
                <div className="mb-3">
                  <label className="form-label">Imagen del Producto</label>

                  {/* Input tipo FILE (solo imágenes) */}
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {/* Previsualización */}
                  {formData.image && (
                    <div className="mt-3 text-center">
                      <p className="text-muted small">Vista previa:</p>
                      <img
                        src={formData.image}
                        alt="Vista previa"
                        className="img-thumbnail"
                        style={{ maxHeight: '150px' }}
                      />
                    </div>
                  )}
                </div>
                {/* ------------------------------------- */}

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Seleccionar...</option>
                      <option value="Electrónica">Electrónica</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Hogar">Hogar</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" rows="3" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')} disabled={isUploading}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success" disabled={isUploading}>
                    {isUploading ? 'Procesando...' : (id ? 'Actualizar' : 'Guardar')}
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