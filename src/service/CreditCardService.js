import axios from 'axios';
import config from '../config';

class CreditCardService {
    async createCreditCard(token, CreditCardRegisterRequest) {
        console.log('Registrando tarjeta de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/credit-card`, CreditCardRegisterRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error during registration: ' + error);
        }
    }

    async updateCreditCard(id, token, CreditCardUpdateRequest) {
        console.log('Actualizando tarjeta de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.put(`${config.API_URL}/FlexPay/credit-card/${id}`, CreditCardUpdateRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error during update: ' + error);
        }
    }

}

export default CreditCardService;