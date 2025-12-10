import axios from 'axios';


const IMGBB_API_KEY = 'fb0c1a27c565ba50381bca162276c1a3'; 

export const uploadImageToImgBB = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);

    
    return response.data.data.url;
  } catch (error) {
    console.error("Error subiendo imagen a ImgBB:", error);
    throw new Error("No se pudo subir la imagen");
  }
};