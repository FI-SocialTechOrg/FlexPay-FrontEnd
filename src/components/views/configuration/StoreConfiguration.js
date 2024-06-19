import React, { useState } from 'react';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/StoreConfiguration.css';

function StoreConfiguration() {
   
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <div className='store-configuration'>
                <h1 className='store-configuration-title'>Configuración</h1>

            </div>
            
        </motion.div>
    );
}

export default StoreConfiguration;
