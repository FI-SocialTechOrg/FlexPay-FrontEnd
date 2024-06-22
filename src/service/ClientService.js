import axios from 'axios';
import config from '../config';

class ClientService {
    async registerClient(ClientRegisterRequest, token) {
        console.log('Registrando cliente...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/customer`, ClientRegisterRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error during registration: ' + error);
        }
    }

    async getclientById(id, token) {
        console.log('Obteniendo cliente...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/customer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting client: ' + error);
        }
    }

    async getclientByAccountId(id, token) {
        console.log('Obteniendo cliente...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/customer/account/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting client: ' + error);
        }
    }

    async updateClient(id, token, ClientUpdateRequest) {
        console.log('Actualizando cliente...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.put(`${config.API_URL}/FlexPay/customer/${id}`, ClientUpdateRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error updating client: ' + error);
        }
    }

}

export default ClientService;