import React, { useState } from 'react';
import Navbar from '../../elements/Navbar';
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CustomLink, DropDownDark, TextInput } from '../../elements/Elements';
import { useLocation } from 'react-router-dom';
import './styles/Payment.css';

function PaymentView() {
    const location = useLocation();
    const parts = location.pathname.split('/');
    const currentStoreId = parts[parts.length - 3]; 
    const [selectedOption, setSelectedOption] = useState('0'); 
    const [initialPayment, setInitialPayment] = useState(''); 
    const [includeGracePeriod, setIncludeGracePeriod] = useState(false); 
    const totalAmount = 1000.00;

    let remainingAmount = totalAmount - parseFloat(initialPayment);
    if (remainingAmount < 0) {
        remainingAmount = 0;
    }

    const options = [
        { value: '0', text: 'Sin cuotas' },
        { value: '2', text: '2 cuotas' },
        { value: '3', text: '3 cuotas' },
    ];

    const message = initialPayment > totalAmount ? 
        'La cuota inicial debe ser igual o menor al monto total' :
        `Monto a financiar: S/ ${isNaN(remainingAmount) ? totalAmount.toFixed(2) : remainingAmount.toFixed(2)}`;


    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("Cuotas seleccionadas: " + event.target.value);
        setIncludeGracePeriod(false);
    };

    const handleInitialPaymentChange = (event) => {
        const value = event.target.value;
    
        if (value === '') {
            setInitialPayment('');
        } else {
            const parsedValue = parseFloat(value);
            if (parsedValue > totalAmount) {
                console.log("Cuota inicial: " + value);
                toast.error("La cuota inicial debe ser igual o menor al monto total", {
                    position: "top-center",
                    style: { background: '#white', color: '#000' },
                    progressStyle: { background: '#007bff' },
                    autoClose: 1000,
                });
                setInitialPayment(totalAmount.toString());
                console.log('Cuota fijada: ' + totalAmount.toString());
            } else {
                setInitialPayment(parsedValue.toString()); 
            }
        }
    };
    
    const handleContinue = () => {
        console.log('Pago realizado');
    };

    const toggleIncludeGracePeriod = () => {
        setIncludeGracePeriod(!includeGracePeriod);
        console.log("Plazo de gracia: " + includeGracePeriod);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh',}}
        >
            <ToastContainer />
            <Navbar />
            <div className='payment-container'>
                <h1 className='payment-container-title'>Pago</h1>
                <CustomLink href={`/client/stores/${currentStoreId}/shopping-cart`} alignment='flex-start' text="&lt; Volver" color="white" fontweight={'300'} />

                <form className='payment-input'>
                    <div className="total-box">
                        <span>Total</span>
                        <span className="amount">S/ {totalAmount.toFixed(2)}</span>
                    </div>
                    <p className='textinput-title-payment'>Ingrese la cuota inicial a pagar</p>
                    <div className="form-group-payment">
                        <TextInput
                            type='number'
                            placeholder='00.00'
                            inputMode='numeric'
                            value={initialPayment}
                            onChange={handleInitialPaymentChange}
                            max={totalAmount.toFixed(2)} 
                        />    
                    </div>                
                    <p className='warning'>{message}</p>
                    <p className='textinput-title-payment'>Seleccione el número de cuotas</p>
                    <DropDownDark options={options} onChange={handleDropdownChange} value={selectedOption}/>
                    
                    {selectedOption === '0' ? (
                        <p className="warning">
                            <span className="icon-circle">
                                <i className="icon-i">i</i>
                            </span>
                            El pago deberá realizarse en la próxima fecha de pago
                        </p>
                    ) : (
                        <p className="warning">
                            <span className="icon-circle">
                                <i className="icon-i">i</i>
                            </span>
                            Los pagos deberán realizarse en la fecha de pago elegida
                        </p>
                    )}

                    {selectedOption !== '0' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}  
                            animate={{ opacity: 1, y: 0 }}   
                            exit={{ opacity: 0, y: -20 }}     
                            transition={{ duration: 0.3, delay: 0 }}
                        >
                            <div className="grace-period">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={includeGracePeriod}
                                        onChange={toggleIncludeGracePeriod}
                                    />
                                    Incluir plazo de gracia
                                </label>
                            </div>
                        </motion.div>
                    )}

                    <Button text='Continuar' alignment='flex-start' onClick={handleContinue} disabled={initialPayment > totalAmount} />
                </form>

            </div>
        </motion.div>
    );
}

export default PaymentView;
