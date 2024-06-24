import './styles/Form.css'
import { motion } from "framer-motion";
import {TextInput, Button, CustomLink} from "../../elements/Elements";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ClientService from '../../../service/ClientService';
import ClientRegisterRequest from '../../../model/dto/request/ClientRegisterRequest';
import StoreRegisterRequest from '../../../model/dto/request/StoreRegisterRequest';
import StoreService from '../../../service/StoreService';
import CreditConfigurationService from '../../../service/CreditConfigurationService';
import InterestService from '../../../service/InterestService';
import CreditConfigurationRequest from '../../../model/dto/request/CreditConfigurationRequest';
import InterestRequest from '../../../model/dto/request/InterestRequest';
import CreditCardRequest from "../../../model/dto/request/CreditCardRequest";
import ShoppingCartRequest from "../../../model/dto/request/ShoppingCartRequest";
import CreditCardService from "../../../service/CreditCardService";
import ShoppingCartService from "../../../service/ShoppingCartService";

function Register2({ role, id, token }) {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeImageUrl, setStoreImageUrl] = useState(''); // [storeImage, setStoreImage
    const [ruc, setRuc] = useState('');

    const clientService = new ClientService();
    const storeService = new StoreService();
    const storeConfigurationService = new CreditConfigurationService();
    const interestService = new InterestService();
    const creditCardService = new CreditCardService();
    const shoppingCartService = new ShoppingCartService();

    const handleRegisterClient =  async () => {
        const localdate = new Date().toISOString().split('T')[0];
        const clientReq = new ClientRegisterRequest(name, lastName, dni, phone, 'none', localdate, 'none', 0, state.id);

        try {
            const clientRegister = await clientService.registerClient(clientReq, state.token);
            if(clientRegister.status === 200 || clientRegister.status === 201) {
                createShoppingCart(clientRegister.data.data.id);
                console.log('Cliente registrado correctamente');
                toast.success("Cuenta creada exitosamente", {
                    position: "top-center",
                    style: { background: '#FFFFFF', color: '#000000' }, 
                    autoClose: 1000,
                });
                setTimeout(() => {
                    navigate('/auth/login');
                }, 2000);
            }
            else {
                console.log('Error durante el registro');
                console.log('Error:', clientRegister);
                navigate('/register/1');
            }
        }
        catch (error) {
            console.log('Error durante el registro:', error);
        }
    }

    const createCreditCard = async (ShoppingCartId) => {
        const creditCardReq = new CreditCardRequest(0, 0, 0, 0, 0, 1, ShoppingCartId);
        try {
            const creditCardRes = await creditCardService.createCreditCard(state.token, creditCardReq);
            if(creditCardRes.status === 200 || creditCardRes.status === 201) {
                console.log('Tarjeta de crédito creada correctamente');
            } else {
                console.log('Error durante la creacion de la tarjeta de credito');
                console.log('Error:', creditCardRes);
            }
        } catch (error) {
            console.log('Error durante la creacion de la tarjeta de credito:', error);
        }
    }

    const createShoppingCart = async (clientId) => {
        const shoppingCartReq = new ShoppingCartRequest(0, clientId, 1);
        try {
            const shoppingCartRes = await shoppingCartService.createShoppingCart(state.token, shoppingCartReq);
            if(shoppingCartRes.status === 200 || shoppingCartRes.status === 201) {
                createCreditCard(shoppingCartRes.data.data.id)
                console.log('Carrito de compras creado correctamente');
            } else {
                console.log('Error durante la creacion del carrito de compras');
                console.log('Error:', shoppingCartRes);
            }
        } catch (error) {
            console.log('Error durante la creacion del carrito de compras:', error);
        }
    }

    const createInterestRates = async (storeConfigId) => {
        console.log('Creando tasas de interes...');

                //Crear las tasas de interés de la tienda
                // Por defecto es tasa efectiva mensual 0%

                try{
                     //Tasa de interés - Pago sin cuotas
                    const interestReq1 = new InterestRequest(0, storeConfigId, 1, 1, 2);
                    await interestService.createInterest(state.token, interestReq1);
    
                    //Tasa de interés moratoria - Pago sin cuotas
                    const interestMoratory1 = new InterestRequest(0, storeConfigId, 2, 1, 2);
                    await interestService.createInterest(state.token, interestMoratory1);
                
                    //Tasa de interés compensatoria - Pago con cuotas  
                    const interestCompensatory1 = new InterestRequest(0, storeConfigId, 3, 1, 2);
                    await interestService.createInterest(state.token, interestCompensatory1);
                    
                    //Tasa de interés - Pago en cuotas
                    const interestReq2 = new InterestRequest(0, storeConfigId, 4, 1, 2);
                    await interestService.createInterest(state.token, interestReq2);
                   
                    //Tasa de interés moratoria - Pago en cuotas
                    const interestMoratory2 = new InterestRequest(0, storeConfigId, 5, 1, 2);
                    await interestService.createInterest(state.token, interestMoratory2);
                    
                    //Tasa de interés compensatoria - Pago en cuotas   
                    const interestCompensatory2 = new InterestRequest(0, storeConfigId, 6, 1, 2);
                    await interestService.createInterest(state.token, interestCompensatory2);
                    
                } catch (error) {
                    console.log('Error durante la creacion de las tasas de interes:', error);
                }
                
    }

    const createCreditConfiguration = async (storeConfigId) => {
        console.log('tienda:', state.id)
        const storeConfigReq = new CreditConfigurationRequest(0, 0, 0, 0, 0, 0, storeConfigId);
        console.log('storeConfigReq', storeConfigReq)
        try{
            const storeConfigRes = await storeConfigurationService.createCreditConfiguration(state.token, storeConfigReq );
            if(storeConfigRes.status === 200 || storeConfigRes.status === 201) {
                const storeConfigId = storeConfigRes.data.data.id;
                createInterestRates(storeConfigId);
            } else {
                console.log('Error durante la creacion de la configuracion de credito');
                console.log('Error:', storeConfigRes);
            }

        } catch (error) {
            console.log('Error durante la creacion de la configuracion de credito:', error);
        }
    }

     
    const handleRegisterStore = async () => {
        const storeReq = new StoreRegisterRequest(name, lastName, phone, dni, ruc, storeName, storeImageUrl, state.id);
        console.log('storeReq', state.id)
        try {
            //Crear la tienda
            const storeRegister = await storeService.registerStore(storeReq, state.token);
            
            if(storeRegister.status === 200 || storeRegister.status === 201) {
                console.log('Tienda registrada correctamente');
                toast.success("Cuenta creada exitosamente", {
                    position: "top-center",
                    style: { background: '#FFFFFF', color: '#000000' }, 
                    autoClose: 1000,
                });
                setTimeout(() => {
                    createCreditConfiguration(storeRegister.data.data.id);
                }, 5000);
                setTimeout(() => {
                    navigate('/auth/login');
                }, 6000);
            }
            else {
                console.log('Error durante el registro');
                console.log('Error:', storeRegister);
                navigate('/register/1');
            }
        } catch (error) {
            console.log('Error durante el registro:', error);
        }
    }

    function renderFormFields() {
        if (state && state.role === 1) {
            return (
                <>
                        <div className="form-group-register">
                            <TextInput
                                type={'text'}
                                placeholder={'Nombre'}
                                inputMode={'text'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group-register">
                            <TextInput
                                type={'text'}
                                placeholder={'Apellido'}
                                inputMode={'text'}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="form-group-register">
                            <TextInput
                                type={'number'}
                                placeholder={'DNI'}
                                inputMode={'numeric'}
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                            />
                        </div>
                        <div className="form-group-register">
                            <TextInput
                                type={'number'}
                                placeholder={'Celular'}
                                inputMode={'numeric'}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <Button text = {'Registrarse'} alignment = {'center'} onClick={handleRegisterClient}/>
                    </>    
            );
        } else if (state && state.role === 2) {
            return (
                <>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Nombre de la tienda"
                            inputMode={'text'}
                            value={storeName}
                            onChange={e => setStoreName(e.target.value)}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Url de imagen de la tienda"
                            inputMode={'text'}
                            value={storeImageUrl}
                            onChange={e => setStoreImageUrl(e.target.value)}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type="number"
                            placeholder="RUC"
                            inputMode={'numeric'}
                            value= {ruc}
                            onChange= {e => setRuc(e.target.value)}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Nombre del propietario"
                            inputMode={'text'}
                            value= {name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group-register">
                        <TextInput
                            type={'text'}
                            placeholder="Apellido del propietario"
                            inputMode={'text'}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group-row">
                        <TextInput
                            type={'number'}
                            placeholder="DNI"
                            inputMode={'numeric'}
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                        />
                        <TextInput
                            type={'number'}
                            placeholder="Celular"
                            inputMode={'numeric'}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <Button text = {'Registrarse'} alignment = {'center'} onClick={handleRegisterStore}/>
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
              <ToastContainer/>
                    <div className = "form">
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

                        <div className='render-form'>
                            {renderFormFields()}
                        </div>
                    </div>
        </motion.div>
    )
}

export default Register2;