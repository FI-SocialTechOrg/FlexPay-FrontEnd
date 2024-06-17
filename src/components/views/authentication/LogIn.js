import './styles/Form.css'
import { motion } from "framer-motion";
import {TextInput, Button, CustomLink} from "../../elements/Elements";
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const isSmallScreen = window.innerWidth < 800;
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('Iniciando sesión...');
       navigate('/welcome');
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', width: '100%', alignSelf: 'flex-start', top: '0'}}
        >
                    <form className = "form">
                        <div className = "title-container">
                            <h1 className = "form-title">
                                Inicia Sesión
                            </h1>
                            <div className="register-redirect">
                            <p>¿No tienes una cuenta?</p>
                            <CustomLink text = {'Regístrate'} href = {'/auth/register/1'}/>
                            </div>
                        </div>

                        <div className="column">
                            <p className = "textinput-title">
                                Usuario
                            </p>
                            <div className = "form-group-login">
                                <TextInput
                                    type = {'text'}
                                    placeholder = {'Ingrese su usuario'}
                                />
                            </div>
                        </div>

                        <div className="column">
                            <p className = "textinput-title">
                                Contraseña
                            </p>
                            <div className = "form-group-login">
                                <TextInput
                                    type = {'password'}
                                    placeholder = {'Ingrese su contraseña'}
                                />
                            </div>
                        </div>

                        {isSmallScreen 
                        ? <Button text = {'Iniciar Sesión'} alignment = {'center'} onClick={handleClick}/>
                        : <Button text = {'Iniciar Sesión'} alignment = {'start'} onClick={handleClick}/>
                        }
                    </form>

        </motion.div>
    )
}

export default LogIn;