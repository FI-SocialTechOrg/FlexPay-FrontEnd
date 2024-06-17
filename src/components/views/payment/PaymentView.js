import React, { useState } from 'react';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CustomLink, DropDownDark, TextInput, PaymentDetailsCard } from '../../elements/Elements';
import { useLocation } from 'react-router-dom';
import './styles/Payment.css';

function PaymentView() {
    const location = useLocation();
    const parts = location.pathname.split('/');
    const currentStoreId = parts[parts.length - 3]; 
    const [selectedOption, setSelectedOption] = useState('0'); 
    const [initialPayment, setInitialPayment] = useState(''); 
    const [includeGracePeriod, setIncludeGracePeriod] = useState(false); 
    const [showCard, setShowCard] = useState(false);
    
    // Cálculos

    const totalAmount = 1000.00;
    let remainingAmount = totalAmount - parseFloat(initialPayment);
    if (remainingAmount < 0) {
        remainingAmount = 0;
    }

    const financeAmount = isNaN(remainingAmount) ? parseFloat(totalAmount.toFixed(2)) : parseFloat(remainingAmount.toFixed(2));
    const interestRate = selectedOption === '1' ? 0.05 : 0.08 ;
    const interest = financeAmount * interestRate;
    const totalToPay = financeAmount + interest;

    const options = [
        { value: '0', text: 'Sin cuotas' },
        { value: '2', text: '2 cuotas' },
        { value: '3', text: '3 cuotas' },
    ];

    const message = initialPayment > totalAmount ? 
        'La cuota inicial debe ser igual o menor al monto total' :
        `Monto a financiar: S/ ${financeAmount}`;


    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
        setIncludeGracePeriod(false);
    };

    const handleInitialPaymentChange = (event) => {
        const value = event.target.value;
    
        if (value === '') {
            setInitialPayment('');
        } else {
            const parsedValue = parseFloat(value);
            if (parsedValue > totalAmount) {
                toast.error("La cuota inicial debe ser igual o menor al monto total", {
                    position: "top-center",
                    style: { background: '#white', color: '#000' },
                    progressStyle: { background: '#007bff' },
                    autoClose: 1000,
                });
                setInitialPayment(totalAmount.toString());
            } else {
                setInitialPayment(parsedValue.toString()); 
            }
        }
    };
    
    const handleContinue = () => {
        setShowCard(true);
    };

    const toggleIncludeGracePeriod = () => {
        setIncludeGracePeriod(!includeGracePeriod);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <div className='payment-container'>
                <h1 className='payment-container-title'>Pago</h1>
                <CustomLink href={`/client/stores/${currentStoreId}/shopping-cart`} alignment='flex-start' text="&lt; Volver" color="white" fontweight={'300'} />

                <div className='payment-sub'>
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
                        
                        {/*Mostrar detalle de la fecha de pago al seleccionar las cuotas*/}
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

                        {/*Mostrar checkbox del periodo de gracia si se eligen cuotas*/}
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

                        {!showCard && (
                            <Button text='Continuar' alignment='flex-start' onClick={handleContinue} />
                        )}
                    </form>

                    <div className='payment-details'>
                        {showCard && (
                            <PaymentDetailsCard
                                remainingAmount={financeAmount}
                                selectedOption={selectedOption}
                                interestRate={interestRate}
                                interest={interest}
                                totalToPay={totalToPay}
                                onAccept={() => console.log('Pago aceptado')}
                            />
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

export default PaymentView;
