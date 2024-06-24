import React from 'react';
import './styles/Welcome.css'
import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from '../../assets/flexpay_logo.png';
import calendar from '../../assets/calendar.png';
import { RedirectButton, DropDownLight } from '../../elements/Elements';
import ClientService from '../../../service/ClientService';
import ClientRegisterRequest from "../../../model/dto/request/ClientRegisterRequest";
import {useNavigate} from "react-router-dom";

function Welcome() {
    const [name, setName] = useState('');
    const [clientData, setClientData] = useState(null);
    const clientService = new ClientService();
    const navigate = useNavigate()

    const getAccountData = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const id = user.id;
        const token = user.token;
        try {
            const accountRes = await clientService.getclientByAccountId(id, token);
            console.log(accountRes); 
            if(accountRes.status === 200 || accountRes.status === 201){
                setClientData(accountRes.data.data);
                setName(accountRes.data.data.firstName);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
   
    useState(() => {
        getAccountData();
    }, []);

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
        setSelectedOption(parseInt(event.target.value, 10));
        console.log("Fecha seleccionada: " + event.target.value);
        console.log('Mira el clientData:', clientData);
    };

    const handleConfirm = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;


        const clientReq = new ClientRegisterRequest(clientData.firstName, clientData.lastName, clientData.dni,
            clientData.phone, clientData.gender, clientData.birthday, clientData.photoUrl, selectedOption, clientData.account.id);
        console.log('Observa:', clientReq);

        try {
            const updateRes = await clientService.updateClient(clientData.id, token, clientReq);
            if (updateRes.status === 200 || updateRes.status === 201) {
                console.log('Término de crédito actualizado exitosamente.');
                navigate('/client/stores');
            }
        } catch (error) {
            console.log('Error al actualizar el término de crédito:', error);
        }
    }

    if (!clientData) {
        return null;  // O manejar una carga inicial
    }
    
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
                        <RedirectButton onClick={handleConfirm} text={'Siguiente'} />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Welcome;