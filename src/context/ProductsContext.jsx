import { createContext, useContext, useState, useEffect } from 'react';
import { getProductsRequest, deleteProductRequest, createProductRequest, updateProductRequest } from '../services/api';
import { toast } from 'react-toastify'; 

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener productos al montar
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar productos");
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setProducts(products.filter(product => product.id !== id));
      await deleteProductRequest(id);
      toast.success("Producto eliminado");
    } catch (error) {
      toast.error("Error al eliminar");
      getProducts(); 
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      setProducts([...products, res.data]);
      toast.success("Producto creado con éxito");
      return true; 
    } catch (error) {
      toast.error("Error al crear producto");
      return false;
    }
  };
  
    const updateProduct = async (id, updatedFields) => {
    try {
      const res = await updateProductRequest(id, updatedFields);
      // Actualizamos el array local buscando el índice
      setProducts(products.map(p => (p.id === id ? res.data : p)));
      toast.success("Producto actualizado");
      return true;
    } catch (error) {
       toast.error("Error al actualizar");
       return false;
    }
  };

  return (
    <ProductsContext.Provider value={{ 
      products, 
      loading, 
      deleteProduct, 
      createProduct,
      updateProduct 
    }}>
      {children}
    </ProductsContext.Provider>
  );
};