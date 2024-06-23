import axios from 'axios';
import config from '../config';

class StoreService {
    async registerStore(storeRegisterRequest, token) {
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/store`, storeRegisterRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error during registration: ' + error);
        }
    }

    async getStoreByAccountId(id, token) {
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/store/account/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting store: ' + error);
        }
    }

    async getStoreById(id, token){
        try{
            const response = await axios.get(`${config.API_URL}/FlexPay/store/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting store: ' + error);
        }
    }

    async getStores(token){
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/store`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting stores: ' + error);
        }
    }
}

export default StoreService;