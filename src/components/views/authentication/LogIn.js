import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextInput, Button, CustomLink } from '../../elements/Elements';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function LogIn({ setUser }) {
    const isSmallScreen = window.innerWidth < 800;
    const navigate = useNavigate();

    // Manejo de inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Simulación de data
    const data = [
        { id: 1, email: 'cliente@gmail.com', password: 'cliente123.', type: 'client' },
        { id: 2, email: 'tienda@gmail.com', password: 'tienda123.', type: 'store' }
    ];

    const handleSubmit = (event) => {
        event.preventDefault(); 

        console.log('Iniciando sesión...');
        console.log('Email:', email);
        console.log('Contraseña:', password);

        // Verificar las credenciales ingresadas

        if (email === '' || password === '') { 
            toast.error('Por favor, complete todos los campos', {
                position: "top-center",
                style: { background: '#FFFFFF', color: '#000000' },
                autoClose: 1000,
            });
        } else {
            const user = data.find(user => user.email === email && user.password === password);
            console.log('Usuario:', user);

            if(user !== undefined){
                setUser({ isLoggedIn: true, type: user.type });
                if (user.type === 'client') {
                    navigate('/welcome');
                } else if (user.type === 'store') {
                    navigate('/store');
                }   
            }
            else {
                toast.error('Usuario o contraseña incorrectos', {
                    position: "top-center",
                    style: { background: '#FFFFFF', color: '#000000' }, 
                    autoClose: 1000,
                });
            } 
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
            <ToastContainer />
            <form className="form" onSubmit={handleSubmit}>
                <div className="title-container">
                    <h1 className="form-title">
                        Inicia Sesión
                    </h1>
                    <div className="register-redirect">
                        <p>¿No tienes una cuenta?</p>
                        <CustomLink text={'Regístrate'} href={'/auth/register/1'} />
                    </div>
                </div>

                <div className="column">
                    <p className="textinput-title">
                        Email
                    </p>
                    <div className="form-group-login">
                        <TextInput
                            type={'text'}
                            placeholder={'Ingrese su correo electrónico'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="column">
                    <p className="textinput-title">
                        Contraseña
                    </p>
                    <div className="form-group-login">
                        <TextInput
                            type={'password'}
                            placeholder={'Ingrese su contraseña'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
