import { useState } from 'react';
import './styles/Form.css'
import {TextInput, RadioButton, CustomLink} from "../../elements/Elements";
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
                            type={'text'}
                            placeholder={'Nombre'}
                            inputMode={'text'}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder={'Apellido'}
                            inputMode={'text'}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'number'}
                            placeholder={'DNI'}
                            inputMode={'numeric'}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'number'}
                            placeholder={'Celular'}
                            inputMode={'numeric'}
                        />
                    </div>
                </>
            );
        } else if (userChecked === 'store') {
            return (
                <>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Nombre de la tienda"
                            inputMode={'text'}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="number"
                            placeholder="RUC"
                            inputMode={'numeric'}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Nombre del propietario"
                            inputMode={'text'}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Apellido del propietario"
                            inputMode={'text'}
                        />
                    </div>
                    <div className="form-group-row">
                        <TextInput
                            type={'number'}
                            placeholder="DNI"
                            inputMode={'numeric'}
                        />
                        <TextInput
                            type={'number'}
                            placeholder="Celular"
                            inputMode={'numeric'}
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