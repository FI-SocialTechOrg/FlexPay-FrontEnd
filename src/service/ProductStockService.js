import axios from 'axios';
import config from '../config';

class ProductStockService {
    async getProductById(id, token) {
        console.log('Obteniendo producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/productStock/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting product: ' + error);
        }
    }

    async updateProductStock(id, token, productStock) {
        console.log('Actualizando stock de producto...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.put(`${config.API_URL}/FlexPay/productStock/${id}`, productStock, {
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