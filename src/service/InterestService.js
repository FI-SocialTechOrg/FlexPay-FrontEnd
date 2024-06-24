import axios from 'axios';
import config from '../config';

class InterestService {

    async createInterest(token, InterestRequest) {
        console.log('Creando interés...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/interest`, InterestRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error creating interest: ' + error);
        }
    }

    async getInterestById(id, token) {
        console.log('Obteniendo interés...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/interest/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting interest: ' + error);
        }
    }

    async updateInterest(id, token, InterestUpdateRequest) {
        console.log('Actualizando interés...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.put(`${config.API_URL}/FlexPay/interest/${id}`, InterestUpdateRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error updating interest: ' + error);
        }
    }

}

export default InterestService;