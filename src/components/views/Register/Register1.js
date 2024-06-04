import { useState } from 'react';
import {TextInput, RadioButton, CustomLink} from "../../elements/Elements";
import '../../styles/Form.css'
import { motion } from "framer-motion";

function Register1() {
    
    const [userChecked, setUserChecked] = useState('client');
    const [opacity, setOpacity] = useState(1);

    function onCheckChange(e) {
        setOpacity(0);
        setTimeout(() => {
            setUserChecked(e.target.value);
            setOpacity(1);
        }, 300);
    }

    function renderFormFields() {
        if (userChecked === 'client') {
            return (
                <>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="Apellido"
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="DNI"
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="Celular"
                        />
                    </div>
                </>
            );
        } else if (userChecked === 'store') {
            return (
                <>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="Nombre de la tienda"
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="RUC"
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="text"
                            placeholder="Nombre del propietario"
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="password"
                            placeholder="Apellido del propietario"
                        />
                    </div>
                    <div className="form-group-row">
                        <TextInput
                            type="password"
                            placeholder="DNI"
                        />
                        <TextInput
                            type="password"
                            placeholder="Celular"
                        />
                    </div>
                </>
            );
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', width: '100%'}}
        >
    
                    <form className="form">
                        <div className="title-container">
                            <h1 className="form-title">
                                Crea una cuenta
                            </h1>
                            <div className="register-redirect">
                                <p>¿Tienes una cuenta?</p>
                                <CustomLink text="Inicia sesión" href={"/auth/login"}/>
                            </div>
                        </div>
                        <div className="user-option">
                            <RadioButton name="userType" text="Cliente" value="client" onChange={onCheckChange} defaultChecked /> 
                            <RadioButton name="userType" text="Tienda" value="store" onChange={onCheckChange}/> 
                        </div>

                        <div className='render-form' style={{ opacity: opacity }} >
                            {renderFormFields()}
                        </div>
                        
                        <CustomLink text="Siguiente >" href={"/auth/register/2"} alignment={"end"}/>
                    </form>
        
        </motion.div>
    )
}

export default Register1;