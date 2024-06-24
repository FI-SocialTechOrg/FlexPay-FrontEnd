import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import './styles/AccountStatement.css';

function AccountStatementView() {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const storedMovements = localStorage.getItem('creditCardMovements');
        if (storedMovements) {
            setMovements(JSON.parse(storedMovements));
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <div className='store-container'>
                <h1 className='store-container-title'>Movimientos</h1>
                <div className="movement-cards">
                    {movements.map((movement, index) => (
                        <div key={index} className='movement-card'>
                            <div className='movement-card-item'>
                                <strong>Crédito: S/</strong> {movement.balance}
                            </div>
                            <div className='movement-card-item'>
                                <strong>Interés: S/</strong> {movement.purchaseInterest !== null ? movement.purchaseInterest : 'N/A'}
                            </div>
                            <div className='movement-card-item'>
                                <strong>Deuda: S/</strong> {movement.debt}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default AccountStatementView;
