import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './styles/StoreConfiguration.css';
import { Button, DropDownDark, RadioButton, TextInput, TextInputLight } from '../../elements/Elements';

function StoreConfiguration() {
    const [creditLine, setCreditLine] = useState('');

    // Estados para tasas de interés y opciones de capitalización para pago sin cuotas
    const [singlePayOptions, setSinglePayOptions] = useState({
      interestRate: 0,
      moratoryRate: 0,
      compensatoryRate: 0,
      interestChecked: 'efectiva',
      moratoryChecked: 'efectiva',
      compensatoryChecked: 'efectiva',
      interestPeriod: '',
      interestCapitalization: '',
      moratoryPeriod: '',
      moratoryCapitalization: '',
      compensatoryPeriod: '',
      compensatoryCapitalization: '',
    });
  
    // Estados para tasas de interés y opciones de capitalización para pago en cuotas
    const [installmentPayOptions, setInstallmentPayOptions] = useState({
      interestRate: 0,
      moratoryRate: 0,
      compensatoryRate: 0,
      interestChecked: 'efectiva',
      moratoryChecked: 'efectiva',
      compensatoryChecked: 'efectiva',
      interestPeriod: '',
      interestCapitalization: '',
      moratoryPeriod: '',
      moratoryCapitalization: '',
      compensatoryPeriod: '',
      compensatoryCapitalization: '',
      gracePeriod: '',
    });
  
    const singleCapitalizationOptions = [
      { value: 'diaria', text: 'Diaria' },
      { value: 'mensual', text: 'Mensual' },
      { value: 'bimestral', text: 'Bimestral' },
      { value: 'semestral', text: 'Semestral' },
      { value: 'anual', text: 'Anual' },
    ];
  
    const singlePeriodOptions = [
      { value: 'mensual', text: 'Mensual' },
      { value: 'bimestral', text: 'Bimestral' },
      { value: 'trimestral', text: 'Trimestral' },
      { value: 'cuatrimestral', text: 'Cuatrimestral' },
      { value: 'semestral', text: 'Semestral' },
      { value: 'anual', text: 'Anual' },
    ];
  
    const gracePeriodOptions = [
      { value: '0', text: 'Sin periodo de gracia' },
      { value: '1', text: '1 fecha de pago' },
      { value: '2', text: '2 fechas de pago' },
    ];
  
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
  
    useEffect(() => {
      console.log('Opciones de pago sin cuotas:', singlePayOptions);
      console.log('Opciones de pago en cuotas:', installmentPayOptions);
    }, [singlePayOptions, installmentPayOptions]);

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
                        <p className='label small'>Capitalización:</p>
                        <div className='inner-config-row'>
                            <DropDownDark
                                options={singleCapitalizationOptions}
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
                            <p className='label small'>Capitalización:</p>
                            <div className='inner-config-row'>
                                <DropDownDark
                                options={singleCapitalizationOptions}
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
                            <p className='label small'>Capitalización:</p>
                            <div className='inner-config-row'>
                                <DropDownDark
                                    options={singleCapitalizationOptions}
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
                                <p className='label small'>Capitalización:</p>
                                <div className='inner-config-row'>
                                <DropDownDark
                                    options={singleCapitalizationOptions}
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
                            <p className='label small'>Capitalización:</p>
                            <div className='inner-config-row'>
                            <DropDownDark
                                options={singleCapitalizationOptions}
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
                            <p className='label small'>Capitalización:</p>
                            <div className='inner-config-row'>
                            <DropDownDark
                                options={singleCapitalizationOptions}
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
                                    onChange={e => handleChangeInstallmentPay('gracePeriod', e.target.value)}
                                    placeholder="Selecciona una opción"
                            />       
                        </div>
                    </div>   
                </div> 
          </div>

          <Button text={'Guardar'} alignment={'flex-start'} />
        </form>
      </div>
    </motion.div>
  );
}

export default StoreConfiguration;
