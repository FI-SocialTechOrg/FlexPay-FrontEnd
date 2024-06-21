import { useEffect, useState } from 'react';
import './styles/Form.css';
import { TextInput, RadioButton, CustomLink } from "../../elements/Elements";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import RegisterAccountRequest from '../../../model/dto/request/RegisterAccountRequest';

function Register1() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userChecked, setUserChecked] = useState('client');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const authenticationService = new AuthService();

    function onCheckChange(e) {
        setUserChecked(e.target.value);
    }

    useEffect(() => {
        console.log('Usuario seleccionado:', userChecked);
    }, [userChecked]);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const role = userChecked === 'client' ? 1 : 2;
        const registerAccount = new RegisterAccountRequest(username, email, password, role);

        try {
            const reg = await authenticationService.register(registerAccount);
 
            if (reg.status === 200 || reg.status === 201) {
                const log = await authenticationService.login({ usernameOrEmail: email, password });
                if (log.status === 200 || log.status === 201) {
                    const id = log.data.data.id;
                    const token = log.data.data.token;
                    navigate('/auth/register/2', { state: { role, id, token} });
                }
                
            }
        } catch (error) {
            setError('Error durante el registro: ' + error.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{ display: 'flex', width: '100%' }}
        >
            <div className="form">
                <div className="title-container">
                    <h1 className="form-title">Crea una cuenta</h1>
                    <div className="register-redirect">
                        <p>¿Tienes una cuenta?</p>
                        <CustomLink text="Inicia sesión" href="/auth/login" />
                    </div>
                </div>
                <div className="user-option">
                    <RadioButton
                        name="userType"
                        text="Cliente"
                        value="client"
                        onChange={onCheckChange}
                        checked={userChecked === 'client'}
                    />
                    <RadioButton
                        name="userType"
                        text="Tienda"
                        value="store"
                        onChange={onCheckChange}
                        checked={userChecked === 'store'}
                    />
                </div>
                <div className="form-group-register">
                    <TextInput
                        type="email"
                        placeholder="Correo electrónico"
                        inputMode="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group-register">
                    <TextInput
                        type="text"
                        placeholder="Usuario"
                        inputMode="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group-register">
                    <TextInput
                        type="password"
                        placeholder="Contraseña"
                        inputMode="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group-register">
                    <TextInput
                        type="password"
                        placeholder="Repetir contraseña"
                        inputMode="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <CustomLink text="Siguiente >" href="#" handleClick={handleRegister} alignment="end" />
            </div>
        </motion.div>
    );
}

export default Register1;
