import axios from 'axios';
import config from '../config';

class AccountService {
    async getAccountById(id, token) {
        try {
            const response = await axios.get(`${config.API_URL}/FlexPay/account/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        }
        catch (error) {
            throw new Error('Error during account retrieval: ' + error);
        }
    }
}

export default AccountService;