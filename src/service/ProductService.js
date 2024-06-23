import axios from 'axios';
import config from '../config';

class ProductService {

    async getProducts(token) {
        console.log('Obteniendo productos...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/products`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting products: ' + error);
        }
    }

    async getProductById(id, token) {
        console.log('Obteniendo producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting product: ' + error);
        }
    }

    async createProduct(product, token) {
        console.log('Creando producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/product`, product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error creating product: ' + error);
        }
    }
}

export default ProductService;