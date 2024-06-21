import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextInput, Button, CustomLink } from '../../elements/Elements';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoginRequest from '../../../model/dto/request/LoginRequest';
import AuthService from '../../../service/AuthService';
import AccountService from '../../../service/AccountService';
import ClientService from '../../../service/ClientService';

function LogIn({ setUser }) {
    const isSmallScreen = window.innerWidth < 800;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.isLoggedIn && user.role === 1) {
                navigate('/welcome');
            } else if (user.isLoggedIn && user.role === 1 && user.isExistCreditTerms) {
                navigate('/client/stores');
            } else if (user.isLoggedIn && user.role === 2) {
                navigate('/store');
            }
        }
    },);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const authenticationService = new AuthService();
    const accountService = new AccountService();
    const clientService = new ClientService();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email && password){
            console.log('Iniciando sesión...');
            const loginReq = new LoginRequest(email, password);
            try{
                const logRes = await authenticationService.login(loginReq);
                if (logRes.status === 200 || logRes.status === 201) {
                    const id = logRes.data.data.id;
                    const token = logRes.data.data.token;
                    const accountRes = await accountService.getAccountById(id, token);
                    const clientRes = await clientService.getclientByAccountId(id, token);
                    let boolCreditTerm = false;
                    if(clientRes.status === 200 || clientRes.status === 201){
                        if (clientRes.data.data.creditTerm !== 0 && clientRes.data.data.creditTerm !== null) {
                            boolCreditTerm = true;
                        }
                    }

                    if (accountRes.status === 200 || accountRes.status === 201) {
                        const account = accountRes.data.data;
                        const role = account.role.id;

                        //Guardar data
                        const userData = { isLoggedIn: true, id: id, token: token, account: account, role: role, isExistCreditTerms: boolCreditTerm};
                        localStorage.setItem('user', JSON.stringify(userData));
                        setUser(userData);

                        //Redirigir
                        if (role === 1 && !boolCreditTerm) {
                            console.log('Iniciando sesión como cliente...');
                            navigate('/welcome');
                        } else if (role === 1 && boolCreditTerm) {
                            navigate('/client/stores');
                        } else if (role === 2) {
                            navigate('/store');
                        }
                    } else {
                        console.log('Error al obtener la cuenta');
                    }
                }
            }
            catch(error){
                console.log('Error durante el inicio de sesión: ' + error);
            }

        } else { 
            toast.error("Por favor, ingrese los campos solicitados", {
                position: "top-center",
                style: { background: '#FFFFFF', color: '#000000' }, 
                autoClose: 1000,
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{ display: 'flex', width: '100%', alignSelf: 'flex-start', top: '0' }}
        >
            <ToastContainer/>
            <form className="form" onSubmit={handleSubmit}>
                <div className="title-container">
                    <h1 className="form-title">Inicia Sesión</h1>
                    <div className="register-redirect">
                        <p>¿No tienes una cuenta?</p>
                        <CustomLink text={'Regístrate'} href={'/auth/register/1'} />
                    </div>
                </div>

                <div className="column">
                    <p className="textinput-title">Correo o nombre de usuario</p>
                    <div className="form-group-login">
                        <TextInput
                            type={'text'}
                            placeholder={'Ingrese su email o nombre de usuario'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="column">
                    <p className="textinput-title">Contraseña</p>
                    <div className="form-group-login" style={{ position: 'relative' }}>
                        <TextInput
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'Ingrese su contraseña'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                color: 'white'
                            }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>

                {isSmallScreen
                    ? <Button text={'Iniciar Sesión'} alignment={'center'} />
                    : <Button text={'Iniciar Sesión'} alignment={'start'} />
                }
            </form>
        </motion.div>
    );
}

export default LogIn;
