
import axios from 'axios';


const API_URL = 'https://6930a5ea778bbf9e00721da3.mockapi.io/'; 

export const api = axios.create({
  baseURL: API_URL,
});


export const getProductsRequest = () => api.get('/products');
export const createProductRequest = (product) => api.post('/products', product);
export const updateProductRequest = (id, product) => api.put(`/products/${id}`, product);
export const deleteProductRequest = (id) => api.delete(`/products/${id}`);