import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CustomLink, DropDownDark, TextInput, PaymentDetailsCard } from '../../elements/Elements';
import { useLocation } from 'react-router-dom';
import './styles/Payment.css';
import CreditConfigurationService from '../../../service/CreditConfigurationService';

function PaymentView({ totalAmount }) {
    const location = useLocation();
    const state = location.state;
    const total = parseFloat(state.totalAmount);

    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    const token = user.token;

    const parts = location.pathname.split('/');
    const currentStoreId = parts[parts.length - 3]; 

    const storeConfigurationService = new CreditConfigurationService();

    const [selectedOption, setSelectedOption] = useState('0'); 
    const [initialPayment, setInitialPayment] = useState(''); 
    const [includeGracePeriod, setIncludeGracePeriod] = useState(false); 
    const [isGraceTotal, setIsGraceTotal] = useState(false);
    const [showCard, setShowCard] = useState(false);
    
    const [interestRate, setInterestRate] = useState({
        name: '', 
        rate: '',
        capitalization: '',
        period: '',
    });

    const [installmentOptions, setInstallmentOptions] = useState([
        { value: '0', text: 'Sin cuotas' },
        { value: '2', text: '2 cuotas' },
    ]); 


    // Estados para tasas de interés y opciones de capitalización para pago sin cuotas
    const [singlePayOptions, setSinglePayOptions] = useState({
        interestRate: '',
        moratoryRate: '',
        compensatoryRate: '',
        interestChecked: '',
        moratoryChecked: '',
        compensatoryChecked: '',
        interestPeriod: '',
        interestCapitalization: '',
        moratoryPeriod: '',
        moratoryCapitalization: '',
        compensatoryPeriod: '',
        compensatoryCapitalization: '',
      });
    
     // Estados para tasas de interés y opciones de capitalización para pago en cuotas
     const [installmentPayOptions, setInstallmentPayOptions] = useState({
        interestRate: '',
        moratoryRate: '',
        compensatoryRate: '',
        interestChecked: '',
        moratoryChecked: '',
        compensatoryChecked: '',
        interestPeriod: '',
        interestCapitalization: '',
        moratoryPeriod: '',
        moratoryCapitalization: '',
        compensatoryPeriod: '',
        compensatoryCapitalization: '',
        gracePeriod: '',
        gracetype: '',
      });

    // Cálculos
    let remainingAmount = total - parseFloat(initialPayment);
    if (remainingAmount < 0) {
        remainingAmount = 0;
    }

    useEffect(() => {
        const getStoreInterests = async () => {
            try {
                const configRes = await storeConfigurationService.getCreditConfigurationByStoreId(currentStoreId, token);
                const interestRes = configRes.data.data.interests;
                setSinglePayOptions({
                    interestRate: parseFloat(interestRes[0].rate),
                    moratoryRate: parseFloat(interestRes[1].rate),
                    compensatoryRate: parseFloat(interestRes[2].rate),
                    interestChecked: interestRes[0].typeInterest.description,
                    moratoryChecked: interestRes[1].typeInterest.description,
                    compensatoryChecked: interestRes[2].typeInterest.description,
                    interestPeriod: interestRes[0].capitalizationPeriod.type,
                    interestCapitalization: interestRes[0].capitalizationPeriod.type,
                    moratoryPeriod: interestRes[1].capitalizationPeriod.type,
                    moratoryCapitalization: interestRes[1].capitalizationPeriod.type,
                    compensatoryPeriod: interestRes[2].capitalizationPeriod.type,
                    compensatoryCapitalization: interestRes[2].capitalizationPeriod.type,
                });
    
                setInstallmentPayOptions({
                    interestRate: parseFloat(interestRes[3].rate),
                    moratoryRate: parseFloat(interestRes[4].rate),
                    compensatoryRate: parseFloat(interestRes[5].rate),
                    interestChecked: interestRes[3].typeInterest.description,
                    moratoryChecked: interestRes[4].typeInterest.description,
                    compensatoryChecked: interestRes[5].typeInterest.description,
                    interestPeriod: interestRes[3].capitalizationPeriod.type,
                    interestCapitalization: interestRes[3].capitalizationPeriod.type,
                    moratoryPeriod: interestRes[4].capitalizationPeriod.type,
                    moratoryCapitalization: interestRes[4].capitalizationPeriod.type,
                    compensatoryPeriod: interestRes[5].capitalizationPeriod.type,
                    compensatoryCapitalization: interestRes[5].capitalizationPeriod.type,
                    gracePeriod: configRes.data.data.gracePeriod,
                    gracetype: parseInt(configRes.data.data.graceType),
                });

                if(configRes.data.data.graceType===0){
                    setIsGraceTotal(true);
                } else {
                    setIsGraceTotal(false);
                }

            } catch (error) {
                console.log(error);
            }
    
        }
        getStoreInterests();
    }, []);
    
    const financeAmount = isNaN(remainingAmount) ? parseFloat(total.toFixed(2)) : parseFloat(remainingAmount.toFixed(2));
    
    const [interest, setInterest] = useState(0);
    const [totalToPay, setTotalToPay] = useState(0);

    const message = initialPayment > total ? 
        'La cuota inicial debe ser igual o menor al monto total' :
        `Monto a financiar: S/ ${financeAmount.toFixed(2)}`;


    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
        setShowCard(false);
        setIncludeGracePeriod(false);
    };

    const handleInitialPaymentChange = (event) => {
        const value = event.target.value;
        setShowCard(false);
        
        if (value === '') {
            setInitialPayment('');
        } else {
            const parsedValue = parseFloat(value);
            if (parsedValue > total) {
                toast.error("La cuota inicial debe ser igual o menor al monto total", {
                    position: "top-center",
                    style: { background: '#white', color: '#000' },
                    progressStyle: { background: '#007bff' },
                    autoClose: 1000,
                });
                setInitialPayment(total.toString());
            } else {
                setInitialPayment(parsedValue.toString()); 
            }
        }
    };

    const buildInterest = () => {
        
        //Caso: Pago sin cuotas
        if(selectedOption === '0'){
            
            //Verificar si es efectiva o nominal
            switch(singlePayOptions.interestChecked){
                case 'efectiva': interestRate.name = 'Tasa Efectiva'; break;
                case 'nominal': interestRate.name = 'Tasa Nominal'; break;
                default: interestRate.name = 'Tasa Efectiva'; break;
            }

            if(singlePayOptions.interestChecked === 'efectiva'){
                switch(singlePayOptions.interestPeriod){
                    case 'mensual': interestRate.period = 'Mensual'; break;
                    case 'bimestral': interestRate.period = 'Bimestral'; break;
                    default: interestRate.period = 'None'; break;
                }
            } else {
                switch(singlePayOptions.interestCapitalization){
                    case 'mensual': interestRate.period = 'Mensual'; break;
                    case 'bimestral': interestRate.period = 'Bimestral'; break;
                    default: interestRate.period = 'None'; break;
                }
                interestRate.capitalization = '1'; //Diaria
            }
           
            interestRate.rate = singlePayOptions.interestRate;
        } else {
            
            //Verificar si es efectiva o nominal
            switch(installmentPayOptions.interestChecked){
                case 'efectiva': interestRate.name = 'Tasa Efectiva'; break;
                case 'nominal': interestRate.name = 'Tasa Nominal'; break;
                default: interestRate.name = 'Tasa Efectiva'; break;
            }

            if(installmentPayOptions.interestChecked === 'efectiva'){
                switch(installmentPayOptions.interestPeriod){
                    case 'mensual': interestRate.period = 'Mensual'; break;
                    case 'bimestral': interestRate.period = 'Bimestral'; break;
                    default: interestRate.period = 'None'; break;
                }
            }
            else {
                switch(installmentPayOptions.interestCapitalization){
                    case 'mensual': interestRate.period = 'Mensual'; break;
                    case 'bimestral': interestRate.period = 'Bimestral'; break;
                    default: interestRate.period = 'None'; break;
                }
                interestRate.capitalization = '1'; //Diaria
            }

            interestRate.rate = installmentPayOptions.interestRate;
        }
    };
    
    const handleContinue = () => {
        console.log(singlePayOptions);
        console.log(installmentPayOptions);
        buildInterest();


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
                            <span className="amount">S/ {total.toFixed(2)}</span>
                        </div>
                        <p className='textinput-title-payment'>Ingrese la cuota inicial a pagar</p>
                        <div className="form-group-payment">
                            <TextInput
                                type='number'
                                placeholder='00.00'
                                inputMode='numeric'
                                value={initialPayment}
                                onChange={handleInitialPaymentChange}
                                max={total.toFixed(2)} 
                            />    
                        </div>                
                        <p className='warning'>{message}</p>
                        <p className='textinput-title-payment'>Seleccione el número de cuotas</p>
                        <DropDownDark options={installmentOptions} onChange={handleDropdownChange} value={selectedOption}/>
                        
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
                        {selectedOption !== '0' && installmentPayOptions.gracePeriod!==0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}  
                                animate={{ opacity: 1, y: 0 }}   
                                exit={{ opacity: 0, y: -20 }}     
                                transition={{ duration: 0.3, delay: 0 }}
                            >
                                <p className="warning">
                                <span className="icon-circle">
                                        <i className="icon-i">i</i>
                                    </span>
                                    {isGraceTotal
                                         ? `Esta tienda otorga un plazo de gracia total de ${installmentPayOptions.gracePeriod.toString()} fecha(s) de pago.`
                                         : `Esta tienda otorga un plazo de gracia parcial de ${installmentPayOptions.gracePeriod.toString()} fecha(s) de pago.`
                                    }
                                </p>
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

                        {selectedOption !== '0' && installmentPayOptions.gracePeriod===0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}  
                                animate={{ opacity: 1, y: 0 }}   
                                exit={{ opacity: 0, y: -20 }}     
                                transition={{ duration: 0.3, delay: 0 }}
                            >
                                <p className="warning">
                                    <span className="icon-circle">
                                        <i className="icon-i">i</i>
                                    </span>
                                    Esta tienda no otorga plazos de gracia
                                </p>
                            </motion.div>
                        )}


                        {!showCard && (
                            <Button text='Continuar' alignment='flex-start' onClick={handleContinue} />
                        )}
                    </form>

                            
                        {showCard && (
                            <motion.div
                            initial={{ opacity: 0, y: -20 }}  
                            animate={{ opacity: 1, y: 0 }}   
                            exit={{ opacity: 0, y: -20 }}     
                            transition={{ duration: 0.3, delay: 0 }}
                            className='payment-details'
                            >
                                <PaymentDetailsCard
                                    remainingAmount={financeAmount}
                                    selectedOption={selectedOption}
                                    interestRate={interestRate.rate}
                                    rateName = {interestRate.name + ' ' + interestRate.period}
                                    interest={interest}
                                    totalToPay={totalToPay}
                                    onAccept={() => console.log('Pago aceptado')}
                                />
                            </motion.div>
                        )}
                    
                </div>

            </div>
        </motion.div>
    );
}

export default PaymentView;
