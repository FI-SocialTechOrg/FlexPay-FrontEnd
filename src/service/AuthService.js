import axios from 'axios';
import config from '../config';

class AuthService {
    async register(RegisterAccountRequest) {
        try {
            const response = await axios.post(`${config.API_URL}/auth/register`, RegisterAccountRequest);
            return response;
        } catch (error) {
            throw new Error('Error during registration: ' + error);
        }
    }

    async login (LoginRequest) {
        try {
            const response = await axios.post(`${config.API_URL}/auth/login`, LoginRequest);
            return response;
        } catch (error) {
            throw new Error('Error during login: ' + error);
        }
    }
}
  

export default AuthService;