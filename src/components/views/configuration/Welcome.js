import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/flexpay_logo.png';
import calendar from '../../assets/calendar.png';
import '../../styles/Form.css'
import { Button } from '../../elements/Elements';

function Auth() {
    var name = "Carlos";
    var line = "1000.00";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', width: '100vw', height: '100vh',}}
        >
            <div className = "form-container">

                <div className = "welcome-left-container">
                    <img className="logo" src={logo} alt="logo"/>
                    <div className='welcome-data'>
                        <div className='welcome-title'>
                            <p className='welcome-h1'>Bienvenido,</p> 
                            <p className='welcome-name'>{name}</p>     
                        </div>    
                        <div className='welcome-description'>
                            <p className='welcome-text'>Cuentas con una línea de crédito de</p>
                            <p className='welcome-h1'>S/ {line}</p>
                        </div>
                    </div>
                </div>

                <div className = "welcome-right-container">
                    <img className='calendar' src={calendar} alt='calendar'></img>
                    <h1 className='pay-title'>Fecha de pago</h1>
                    <div className='pay-text'>
                        <p>Configura tu fecha depago mensual.</p>
                        <p>Recuerda que no podrás modificarla más adelante.</p>
                    </div>
                    <Button text={'Confirmar'} alignment={'center'}/>
                </div>
            </div>
        </motion.div>
    )
}

export default Auth;