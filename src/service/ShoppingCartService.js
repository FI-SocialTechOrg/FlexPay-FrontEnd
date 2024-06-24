import axios from 'axios';
import config from '../config';

class ShoppingCartService {

    async createShoppingCart(token, ShoppingCartRegisterRequest) {
        console.log('Registrando carrito de compras...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/shopping-cart`, ShoppingCartRegisterRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error during registration: ' + error);
        }
    }

    async getShoppingCartByAccountId(id, token) {
        console.log('Obteniendo carrito de compras...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/shopping-cart/customer/account/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting shopping cart: ' + error);
        }
    }


}

export default ShoppingCartService;