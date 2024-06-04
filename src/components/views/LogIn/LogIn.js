import {TextInput, Button, CustomLink} from "../../elements/Elements";
import '../../styles/Form.css'
import { motion } from "framer-motion";


function LogIn() {
    const isSmallScreen = window.innerWidth < 800;
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
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

                        <div className = "form-group-login">
                            <p className = "textinput-title">
                                Usuario
                            </p>
                            <TextInput
                                type = {'text'}
                                placeholder = {'Ingrese su usuario'}
                            />
                        </div>
                        <div className = "form-group-login">
                            <p className = "textinput-title">
                                Contraseña
                            </p>
                            <TextInput
                                type = {'password'}
                                placeholder = {'Ingrese su contraseña'}
                            />
                        </div>
                        {isSmallScreen 
                        ? <Button text = {'Iniciar Sesión'} alignment = {'center'}/>
                        : <Button text = {'Iniciar Sesión'} alignment = {'start'}/>
                        }
                    </form>

        </motion.div>
    )
}

export default LogIn;