import React from 'react';
import './styles/Welcome.css'
import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from '../../assets/flexpay_logo.png';
import calendar from '../../assets/calendar.png';
import { RedirectButton, DropDownLight } from '../../elements/Elements';

function Auth() {
    var name = "Carlos";

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
          options.push({ value: i, text: i });
        }
        return options;
    };

    const options = generateOptions(1, 28);
    // eslint-disable-next-line no-unused-vars
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("Fecha seleccionada: " + event.target.value);
    };
    
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
                    </div>
                </div>

                <div className = "welcome-right-container">
                    <div className='welcome-sub-container'>
                        <img className='calendar' src={calendar} alt='calendar'></img>
                        <h1 className='pay-title'>Fecha de pago</h1>
                        <div className='pay-text'>
                            <p>Configura tu fecha de pago mensual.</p>
                            <p>Recuerda que no podrás modificarla más adelante.</p>
                        </div>
                        <DropDownLight options={options} onChange={handleChange} />
                        <RedirectButton text={'Confirmar'} href={'/client/stores'} />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Auth;