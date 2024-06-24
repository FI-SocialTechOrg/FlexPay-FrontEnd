import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './styles/StoreConfiguration.css';
import { Button, DropDownDark, RadioButton, TextInput, TextInputLight } from '../../elements/Elements';
import CreditConfigurationService from '../../../service/CreditConfigurationService';
import InterestService from '../../../service/InterestService';
import CreditConfigurationRequest from '../../../model/dto/request/CreditConfigurationRequest';
import { toast } from 'react-toastify';
import InterestRequest from '../../../model/dto/request/InterestRequest';
import StoreService from '../../../service/StoreService';

function StoreConfiguration() {
    const storeConfigurationService = new CreditConfigurationService();
    const interestService = new InterestService();
    const storedUser = localStorage.getItem('user');
    
    const [configId, setConfigId] = useState('');
    const [creditLine, setCreditLine] = useState('');
    const [maxMonthlyFee, setMaxMonthlyFee] = useState('0');
    const [singleInterestId, setSingleInterestId] = useState('');
    const [moratoryInterestId, setMoratoryInterestId] = useState('');
    const [compensatoryInterestId, setCompensatoryInterestId] = useState('');
    const [installmentInterestId, setInstallmentInterestId] = useState('');
    const [installmentMoratoryId, setInstallmentMoratoryId] = useState('');
    const [installmentCompensatoryId, setInstallmentCompensatoryId] = useState('');

    const user = JSON.parse(storedUser);
    const id = user.id;
    const token = user.token;

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
     
      const singleCapitalizationOptions = [
        { value: 'mensual', text: 'Mensual' },
        { value: 'bimestral', text: 'Bimestral' },
      ];
    
      const singlePeriodOptions = [
        { value: 'mensual', text: 'Mensual' },
        { value: 'bimestral', text: 'Bimestral' },
      ];
    
      const gracePeriodOptions = [
        { value: '0', text: 'Sin periodo de gracia' },
        { value: '1', text: '1 fecha de pago' },
        { value: '2', text: '2 fechas de pago' },
      ];  

      const graceTypeOptions = [
        { value: 0, text: 'Total' },
        { value: 1, text: 'Parcial' },
      ];


      useEffect(() => {        
        const fetchData = async () => {
            console.log('Obteniendo configuración de crédito...');
            
            try {    
                const storeConfigRes = await storeConfigurationService.getCreditConfigurationByAccountId(id, token);
                console.log('Configuración de crédito:', storeConfigRes);
                const config = storeConfigRes.data.data;
                const interestRes = storeConfigRes.data.data.interests;
                setConfigId(config.id);
                console.log('Configuración:', config);
                console.log('Intereses:', interestRes);
               
                setCreditLine(config.maxCredit);
                setSingleInterestId(interestRes[0].id);
                setMoratoryInterestId(interestRes[1].id);
                setCompensatoryInterestId(interestRes[2].id);
                setInstallmentInterestId(interestRes[3].id);
                setInstallmentMoratoryId(interestRes[4].id);
                setInstallmentCompensatoryId(interestRes[5].id);

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
                    gracePeriod: config.gracePeriod.toString(),
                    gracetype: parseInt(config.graceType),
                });
                console.log('Opciones de pago sin cuotas:', singlePayOptions);
                console.log('Opciones de pago en cuotas:', installmentPayOptions);
            } catch (error) {
                console.error('Error getting credit configuration:', error);
            }
        };
    
        fetchData(); 
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        console.log('Opciones de pago sin cuotas actualizadas:', singlePayOptions);
        console.log('Opciones de pago en cuotas actualizadas:', installmentPayOptions);
    }, [singlePayOptions, installmentPayOptions]);
    
    const handleChangeSinglePay = (field, value) => {
      setSinglePayOptions(prevState => ({
        ...prevState,
        [field]: value,
      }));
    };
  
    const handleChangeInstallmentPay = (field, value) => {
      setInstallmentPayOptions(prevState => ({
        ...prevState,
        [field]: value,
      }));
    };

    const buildInterestRequest = (rate, pay, type, period, capitalization) => {
        let typeInterest = type === 'efectiva' ? 1 : 2;
        let capitalizationPeriod = 1;

        if(type === 'efectiva'){
            switch(period){
                case 'mensual': capitalizationPeriod = 2; break;
                case 'bimestral': capitalizationPeriod = 3; break;
                default: period = 1; break;
            }
        } else {
            switch(capitalization){
                case 'diaria': capitalizationPeriod = 1; break;
                case 'mensual': capitalizationPeriod = 2; break;
                case 'bimestral': capitalizationPeriod = 3; break;
                default: capitalization = 1; break;
            }
        }

        const interest = new InterestRequest(
            parseFloat(rate),
            parseFloat(configId),
            parseFloat(pay), 
            typeInterest,
            capitalizationPeriod
        );
        return interest;
    };

    const handleUpdate = async (event) => {  
        const storeService = new StoreService();
        let storeId = 0;

        event.preventDefault();
        setMaxMonthlyFee('2');

        try {
            const storeRes = await storeService.getStoreByAccountId(id, token);
            if (storeRes.status === 200) {
                storeId = storeRes.data.data.id;
            }
        } catch (error) {
            console.error('Error updating', error);
        }

        //Actualizar config
        const updateConfig = new CreditConfigurationRequest(
            parseInt(creditLine),
            parseInt(maxMonthlyFee),
            0,
            parseInt(installmentPayOptions.gracePeriod),
            parseInt(installmentPayOptions.gracetype),
            0,
            parseInt(storeId)
        );
        try {
            const updateRes = await storeConfigurationService.updateCreditConfiguration(configId, token, updateConfig);

            if (updateRes.status === 200) {

                try {
                    const singleInterest = buildInterestRequest(
                        singlePayOptions.interestRate,
                        1,
                        singlePayOptions.interestChecked,
                        singlePayOptions.interestPeriod,
                        singlePayOptions.interestCapitalization
                    )
                    await interestService.updateInterest(singleInterestId, token, singleInterest);

                    const singleMoratory = buildInterestRequest(
                        singlePayOptions.moratoryRate,
                        2,
                        singlePayOptions.moratoryChecked,
                        singlePayOptions.moratoryPeriod,
                        singlePayOptions.moratoryCapitalization
                    )
                    await interestService.updateInterest(moratoryInterestId, token, singleMoratory)

                    const singleCompensatory = buildInterestRequest(
                        singlePayOptions.compensatoryRate,
                        3,
                        singlePayOptions.compensatoryChecked,
                        singlePayOptions.compensatoryPeriod,
                        singlePayOptions.compensatoryCapitalization
                    )
                    await interestService.updateInterest(compensatoryInterestId, token, singleCompensatory)

                    const installmentInterest = buildInterestRequest(
                        installmentPayOptions.interestRate,
                        4,
                        installmentPayOptions.interestChecked,
                        installmentPayOptions.interestPeriod,
                        installmentPayOptions.interestCapitalization
                    )
                    await interestService.updateInterest(installmentInterestId, token, installmentInterest)

                    const installmentMoratory = buildInterestRequest(
                        installmentPayOptions.moratoryRate,
                        5,
                        installmentPayOptions.moratoryChecked,
                        installmentPayOptions.moratoryPeriod,
                        installmentPayOptions.moratoryCapitalization
                    )
                    await interestService.updateInterest(installmentMoratoryId, token, installmentMoratory)
            
                    const installmentCompensatory = buildInterestRequest(
                        installmentPayOptions.compensatoryRate,
                        6,
                        installmentPayOptions.compensatoryChecked,
                        installmentPayOptions.compensatoryPeriod,
                        installmentPayOptions.compensatoryCapitalization
                    )
                    await interestService.updateInterest(installmentCompensatoryId, token, installmentCompensatory)

                } catch (error) {
                    console.error('Error updating', error);
                }

                toast.success("Configuración actualizada exitosamente", {
                    position: "top-center",
                    style: { background: '#FFFFFF', color: '#000000' }, 
                    autoClose: 1000,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                
            }
        } catch (error) {
            console.error('Error updating credit configuration:', error);
        }

    }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className='store-configuration'>
        <h1 className='store-configuration-title'>Configuración</h1>
        <form className='store-configuration-data'>
          <div className='config-row'>
            <p className='label large left'>Línea de crédito:</p>
            <div className='inner-config-row'>
                <p className='label large'>S/</p>
                <TextInput
                    type='number'
                    placeholder='0.00'
                    inputMode='numeric'
                    maxWidth={'150px'}
                    maxHeight={'10px'}
                    value={creditLine}
                    onChange={e => setCreditLine(e.target.value)}
                />
            </div>
          </div>


          {/* *********************************** */}
          {/* ********* PAGO SIN CUOTAS ********* */}
          {/* *********************************** */}

          <div className='config-row'>
            <p className='label large'>Pago sin cuotas</p>
          </div>

          <div className='config-card'>

            {/* Tasa de interés */}
            <div className='config-column'>
                <div className='inner-config-column'>
                    <p className='label small'>Tasa de interés:</p>
                    <div className='inner-config-row'>
                        <TextInputLight
                        type='number'
                        placeholder='0.00'
                        inputMode='numeric'
                        maxWidth={'80px'}
                        maxHeight={'10px'}
                        value={singlePayOptions.interestRate}
                        onChange={e => handleChangeSinglePay('interestRate', e.target.value)}
                        />
                        <p className='label small'>%</p>
                    </div>
                </div>
             
                <div className='inner-config-column'>
                    <p className='label small'>Tipo de tasa:</p>
                    <div className='inner-config-row'>
                        <RadioButton
                        name="singleInterestRateType"
                        text="Efectiva"
                        value="efectiva"
                        checked={singlePayOptions.interestChecked === 'efectiva'}
                        onChange={e => handleChangeSinglePay('interestChecked', e.target.value)}
                        />
                        <RadioButton
                        name="singleInterestRateType"
                        text="Nominal"
                        value="nominal"
                        checked={singlePayOptions.interestChecked === 'nominal'}
                        onChange={e => handleChangeSinglePay('interestChecked', e.target.value)}
                        />
                    </div>
                </div>

              {singlePayOptions.interestChecked === 'efectiva' && ( 
                <motion.div
                initial={{ opacity: 0, y: -20 }}  
                animate={{ opacity: 1, y: 0 }}   
                exit={{ opacity: 0, y: -20 }}     
                transition={{ duration: 0.3, delay: 0 }}
                >
                    <div className='inner-config-column'>
                        <p className='label small'>Plazo:</p>
                        <div className='inner-config-row'>
                            <DropDownDark
                                options={singlePeriodOptions}
                                value={singlePayOptions.interestPeriod}
                                onChange={e => handleChangeSinglePay('interestPeriod', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                        </div>
                    </div>
                </motion.div>
              )}

              {singlePayOptions.interestChecked === 'nominal' && (
                <motion.div
                initial={{ opacity: 0, y: -20 }}  
                animate={{ opacity: 1, y: 0 }}   
                exit={{ opacity: 0, y: -20 }}     
                transition={{ duration: 0.3, delay: 0 }}
                >
                   <div className='inner-config-column'>
                        <p className='label small'>Plazo:</p>
                        <div className='inner-config-row'>
                            <DropDownDark
                                options={singleCapitalizationOptions}
                                value={singlePayOptions.interestCapitalization}
                                onChange={e => handleChangeSinglePay('interestCapitalization', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                        </div>
                    </div>    
                </motion.div>
                
              )}
            </div>

            {/* Tasa de interés moratoria */}
            <div className='config-column'>
                <div className='inner-config-column'>
                    <p className='label small'>Tasa de interés moratoria:</p>
                    <div className='inner-config-row'>
                        <TextInput
                        type='number'
                        placeholder='0.00'
                        inputMode='numeric'
                        maxWidth={'80px'}
                        maxHeight={'10px'}
                        value={singlePayOptions.moratoryRate}
                        onChange={e => handleChangeSinglePay('moratoryRate', e.target.value)}
                        />
                        <p className='label small'>%</p>
                    </div>
                </div>
                
                <div className='inner-config-column'>
                    <p className='label small'>Tipo de tasa:</p>
                    <div className='inner-config-row'>
                        <RadioButton
                        name="singleMoratoryRateType"
                        text="Efectiva"
                        value="efectiva"
                        checked={singlePayOptions.moratoryChecked === 'efectiva'}
                        onChange={e => handleChangeSinglePay('moratoryChecked', e.target.value)}
                        />
                        <RadioButton
                        name="singleMoratoryRateType"
                        text="Nominal"
                        value="nominal"
                        checked={singlePayOptions.moratoryChecked === 'nominal'}
                        onChange={e => handleChangeSinglePay('moratoryChecked', e.target.value)}
                        />
                    </div>
                </div>

                {singlePayOptions.moratoryChecked === 'efectiva' && (
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}  
                    animate={{ opacity: 1, y: 0 }}   
                    exit={{ opacity: 0, y: -20 }}     
                    transition={{ duration: 0.3, delay: 0 }}
                    >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                                <DropDownDark
                                    options={singlePeriodOptions}
                                    value = {singlePayOptions.moratoryPeriod}
                                    onChange={e => handleChangeSinglePay('moratoryPeriod', e.target.value)}
                                    placeholder="Selecciona una opción"
                                />
                            </div>
                        </div>
                    </motion.div>
                 )
                
                }
                {singlePayOptions.moratoryChecked === 'nominal' && ( 
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}  
                    animate={{ opacity: 1, y: 0 }}   
                    exit={{ opacity: 0, y: -20 }}     
                    transition={{ duration: 0.3, delay: 0 }}
                    >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                                <DropDownDark
                                options={singleCapitalizationOptions}
                                value = {singlePayOptions.moratoryCapitalization}
                                onChange={e => handleChangeSinglePay('moratoryCapitalization', e.target.value)}
                                placeholder="Selecciona una opción"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Tasa de interés compensatoria */}
            <div className='config-column'>

                <div className='inner-config-column'>
                    <p className='label small'>Tasa de interés compensatoria:</p>
                    <div className='inner-config-row'>
                        <TextInput
                        type='number'
                        placeholder='0.00'
                        inputMode='numeric'
                        maxWidth={'80px'}
                        maxHeight={'10px'}
                        value={singlePayOptions.compensatoryRate}
                        onChange={e => handleChangeSinglePay('compensatoryRate', e.target.value)}
                        />
                        <p className='label small'>%</p>
                    </div>
                </div>

                <div className='inner-config-column'>
                    <p className='label small'>Tipo de tasa:</p>
                    <div className='inner-config-row'>
                        <RadioButton
                        name="singleCompensatoryRateType"
                        text="Efectiva"
                        value="efectiva"
                        checked={singlePayOptions.compensatoryChecked === 'efectiva'}
                        onChange={e => handleChangeSinglePay('compensatoryChecked', e.target.value)}
                        />
                        <RadioButton
                        name="singleCompensatoryRateType"
                        text="Nominal"
                        value="nominal"
                        checked={singlePayOptions.compensatoryChecked === 'nominal'}
                        onChange={e => handleChangeSinglePay('compensatoryChecked', e.target.value)}
                        />
                    </div>
                </div>

                {singlePayOptions.compensatoryChecked === 'efectiva' && (
                     
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                                <DropDownDark
                                    options={singlePeriodOptions}
                                    value={singlePayOptions.compensatoryPeriod}
                                    onChange={e => handleChangeSinglePay('compensatoryPeriod', e.target.value)}
                                    placeholder="Selecciona una opción"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {singlePayOptions.compensatoryChecked === 'nominal' && (
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                                <DropDownDark
                                    options={singleCapitalizationOptions}
                                    value={singlePayOptions.compensatoryCapitalization}
                                    onChange={e => handleChangeSinglePay('compensatoryCapitalization', e.target.value)}
                                    placeholder="Selecciona una opción"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
              
            </div>
          </div>

          {/* *********************************** */}
          {/* ********* PAGO EN CUOTAS ********* */}
          {/* *********************************** */}
         

          <div className='config-row'>
            <p className='label large'>Pago en cuotas</p>
          </div>

          <div className='config-card column'>

            {/* Tasa de interés */}
                <div className='sub-config'>
                    <div className='config-column'>
                        <div className='inner-config-column'>
                            <p className='label small'>Tasa de interés:</p>
                            <div className='inner-config-row'>
                            <TextInputLight
                                type='number'
                                placeholder='0.00'
                                inputMode='numeric'
                                maxWidth={'80px'}
                                maxHeight={'10px'}
                                value={installmentPayOptions.interestRate}
                                onChange={e => handleChangeInstallmentPay('interestRate', e.target.value)}
                            />
                            <p className='label small'>%</p>
                            </div>
                        </div>

                        <div className='inner-config-column'>
                            <p className='label small'>Tipo de tasa:</p>
                            <div className='inner-config-row'>
                            <RadioButton
                                name="installmentInterestRateType"
                                text="Efectiva"
                                value="efectiva"
                                checked={installmentPayOptions.interestChecked === 'efectiva'}
                                onChange={e => handleChangeInstallmentPay('interestChecked', e.target.value)}
                            />
                            <RadioButton
                                name="installmentInterestRateType"
                                text="Nominal"
                                value="nominal"
                                checked={installmentPayOptions.interestChecked === 'nominal'}
                                onChange={e => handleChangeInstallmentPay('interestChecked', e.target.value)}
                            />
                            </div>
                        </div>

                        {installmentPayOptions.interestChecked === 'efectiva' && (
                            <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0 }}
                            >
                            <div className='inner-config-column'>
                                <p className='label small'>Plazo:</p>
                                <div className='inner-config-row'>
                                <DropDownDark
                                    options={singlePeriodOptions}
                                    value={installmentPayOptions.interestPeriod}
                                    onChange={e => handleChangeInstallmentPay('interestPeriod', e.target.value)}
                                    placeholder="Selecciona una opción"
                                />
                                </div>
                            </div>
                            </motion.div>
                        )}

                        {installmentPayOptions.interestChecked === 'nominal' && (
                            <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0 }}
                            >
                            <div className='inner-config-column'>
                                <p className='label small'>Plazo:</p>
                                <div className='inner-config-row'>
                                <DropDownDark
                                    options={singleCapitalizationOptions}
                                    value={installmentPayOptions.interestCapitalization}
                                    onChange={e => handleChangeInstallmentPay('interestCapitalization', e.target.value)}
                                    placeholder="Selecciona una opción"
                                />
                                </div>
                            </div>
                            </motion.div>
                        )}
                    </div>
                    

                    {/* Tasa de interés moratoria */}
                    <div className='config-column'>
                        <div className='inner-config-column'>
                            <p className='label small'>Tasa de interés moratoria:</p>
                            <div className='inner-config-row'>
                            <TextInput
                                type='number'
                                placeholder='0.00'
                                inputMode='numeric'
                                maxWidth={'80px'}
                                maxHeight={'10px'}
                                value={installmentPayOptions.moratoryRate}
                                onChange={e => handleChangeInstallmentPay('moratoryRate', e.target.value)}
                            />
                            <p className='label small'>%</p>
                        </div>
                    </div>

                    <div className='inner-config-column'>
                        <p className='label small'>Tipo de tasa:</p>
                        <div className='inner-config-row'>
                        <RadioButton
                            name="installmentMoratoryRateType"
                            text="Efectiva"
                            value="efectiva"
                            checked={installmentPayOptions.moratoryChecked === 'efectiva'}
                            onChange={e => handleChangeInstallmentPay('moratoryChecked', e.target.value)}
                        />
                        <RadioButton
                            name="installmentMoratoryRateType"
                            text="Nominal"
                            value="nominal"
                            checked={installmentPayOptions.moratoryChecked === 'nominal'}
                            onChange={e => handleChangeInstallmentPay('moratoryChecked', e.target.value)}
                        />
                        </div>
                    </div>

                    {installmentPayOptions.moratoryChecked === 'efectiva' && (
                        <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: 0 }}
                        >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                            <DropDownDark
                                options={singlePeriodOptions}
                                value={installmentPayOptions.moratoryPeriod}
                                onChange={e => handleChangeInstallmentPay('moratoryPeriod', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                            </div>
                        </div>
                        </motion.div>
                    )}

                    {installmentPayOptions.moratoryChecked === 'nominal' && (
                        <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: 0 }}
                        >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                            <DropDownDark
                                options={singleCapitalizationOptions}
                                value={installmentPayOptions.moratoryCapitalization}
                                onChange={e => handleChangeInstallmentPay('moratoryCapitalization', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                            </div>
                        </div>
                        </motion.div>
                    )}
                    </div>

                    {/* Tasa de interés compensatoria */}
                    <div className='config-column'>
                        <div className='inner-config-column'>
                            <p className='label small'>Tasa de interés compensatoria:</p>
                            <div className='inner-config-row'>
                            <TextInput
                                type='number'
                                placeholder='0.00'
                                inputMode='numeric'
                                maxWidth={'80px'}
                                maxHeight={'10px'}
                                value={installmentPayOptions.compensatoryRate}
                                onChange={e => handleChangeInstallmentPay('compensatoryRate', e.target.value)}
                            />
                            <p className='label small'>%</p>
                        </div>
                    </div>

                    <div className='inner-config-column'>
                        <p className='label small'>Tipo de tasa:</p>
                        <div className='inner-config-row'>
                        <RadioButton
                            name="installmentCompensatoryRateType"
                            text="Efectiva"
                            value="efectiva"
                            checked={installmentPayOptions.compensatoryChecked === 'efectiva'}
                            onChange={e => handleChangeInstallmentPay('compensatoryChecked', e.target.value)}
                        />
                        <RadioButton
                            name="installmentCompensatoryRateType"
                            text="Nominal"
                            value="nominal"
                            checked={installmentPayOptions.compensatoryChecked === 'nominal'}
                            onChange={e => handleChangeInstallmentPay('compensatoryChecked', e.target.value)}
                        />
                        </div>
                    </div>

                    {installmentPayOptions.compensatoryChecked === 'efectiva' && (
                        <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: 0 }}
                        >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                            <DropDownDark
                                options={singlePeriodOptions}
                                value={installmentPayOptions.compensatoryPeriod}
                                onChange={e => handleChangeInstallmentPay('compensatoryPeriod', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                            </div>
                        </div>
                        </motion.div>
                    )}

                    {installmentPayOptions.compensatoryChecked === 'nominal' && (
                        <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: 0 }}
                        >
                        <div className='inner-config-column'>
                            <p className='label small'>Plazo:</p>
                            <div className='inner-config-row'>
                            <DropDownDark
                                options={singleCapitalizationOptions}
                                value={installmentPayOptions.compensatoryCapitalization}
                                onChange={e => handleChangeInstallmentPay('compensatoryCapitalization', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                            </div>
                        </div>
                        </motion.div>
                    )}

                    </div>
                </div>

                <div className='config-column'>
                    <div className='inner-config-column'>
                        <p className='label small'>Periodo de gracia: </p>
                        <div className='inner-config-row'>
                            <DropDownDark
                                options={gracePeriodOptions}
                                value={installmentPayOptions.gracePeriod}
                                onChange={e => handleChangeInstallmentPay('gracePeriod', e.target.value)}
                                placeholder="Selecciona una opción"
                            />
                            {installmentPayOptions.gracePeriod !== '0' && (
                                 <motion.div
                                 initial={{ opacity: 0, width: '0' }}
                                 animate={{ opacity: 1, width: '100%' }}
                                 exit={{ opacity: 0, width: '0'  }}
                                 transition={{ duration: 0.3, delay: 0 }}
                                 style={{ display: 'flex', width: '100%'}}
                                 >
                                    <DropDownDark
                                        options={graceTypeOptions}
                                        value={installmentPayOptions.gracetype}
                                        onChange={e => handleChangeInstallmentPay('gracetype', e.target.value)}
                                        placeholder="Selecciona una opción"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
          </div>

          <Button text={'Guardar'} alignment={'flex-start'} onClick={handleUpdate} />
        </form>
      </div>
    </motion.div>
  );
}

export default StoreConfiguration;
