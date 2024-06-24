import axios from 'axios';
import config from '../config';

class ProductStockService {
    async getProductById(id, token) {
        console.log('Obteniendo producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/product-stock/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting product: ' + error);
        }
    }

    async createProductStock(productStock, token) {
        console.log('Creando stock de producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/product-stock`, productStock, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error creating product stock: ' + error);
        }
    }

    async updateProductStock(id, productStock, token) {
        console.log('Actualizando stock de producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.put(`${config.API_URL}/FlexPay/product-stock/${id}`, productStock, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error updating product stock: ' + error);
        }
    }
}

export default ProductStockService;