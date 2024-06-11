import './styles/Form.css'
import { motion } from "framer-motion";
import {TextInput, Button, CustomLink} from "../../elements/Elements";

function Register2() {
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', width: '100%'}}
        >
                    <form className = "form">
                        <div className = "title-container">
                            <h1 className = "form-title">
                                Crea una cuenta
                            </h1>
                            <div className="register-redirect">
                                <p>¿Tienes una cuenta?</p>
                                <CustomLink text="Inicia sesión" href={"/auth/login"}/>
                            </div>
                            <p className="text">¡Estás a un paso de ser parte de FlexPay!</p>
                        </div>

                        <div className = "form-group-register">
                            <TextInput
                                type = {'text'}
                                placeholder = {'Correo electrónico'}
                                inputMode={'email'}
                            />
                        </div>
                        <div className = "form-group-register">
                            <TextInput
                                type = {'text'}
                                placeholder = {'Usuario'}
                                inputMode={'text'}
                            />
                        </div>
                        <div className = "form-group-register">
                            <TextInput
                                type = {'password'}
                                placeholder = {'Contraseña'}
                                inputMode={'text'}
                            />
                        </div>
                        <div className = "form-group-register">
                            <TextInput
                                type = {'password'}
                                placeholder = {'Repetir contraseña'}
                                inputMode={'text'}
                            />
                        </div>
                        <Button text = {'Registrarse'} alignment = {'center'}/>
                    </form>
        </motion.div>
    )
}

export default Register2;