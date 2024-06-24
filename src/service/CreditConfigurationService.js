import axios from 'axios';
import config from '../config';

class CreditConfigurationService {
    async createCreditConfiguration(token, CreditConfigurationRequest) {
        console.log('Obteniendo configuración de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.post(`${config.API_URL}/FlexPay/credit-configuration`, CreditConfigurationRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting credit configuration: ' + error);
        }
    }

    async getCreditConfigurationById(id, token) {
        console.log('Obteniendo configuración de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/credit-configuration/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting credit configuration: ' + error);
        }
    }

    async getCreditConfigurationByAccountId(accountId, token) {
        console.log('Obteniendo configuración de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/credit-configuration/store/account/${accountId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting credit configuration: ' + error);
        }
    }

    async getCreditConfigurationByStoreId(storeId, token) {
        console.log('Obteniendo configuración de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/credit-configuration/store/${storeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting credit configuration: ' + error);
        }
    }

    async updateCreditConfiguration(id, token, CreditConfigurationUpdateRequest) {
        console.log('Actualizando configuración de crédito...');
        console.log('Token enviado:', token);
        try {
            const response = await axios.put(`${config.API_URL}/FlexPay/credit-configuration/${id}`, CreditConfigurationUpdateRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error updating credit configuration: ' + error);
        }
    }

}

export default CreditConfigurationService;