import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../elements/Navbar';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import Stores from '../store/Stores';
import ClientStoreView from '../store/ClientStoreView';
import ShoppingCartView from '../store/ShoppingCartView';
import PaymentView from '../payment/PaymentView';

function ClientHomeView() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', flexDirection: 'column', width:'100%', height: '100%',}}
        >
            <ToastContainer />
            <Navbar />
            <div className='home-container'>
               <Routes>
               <Route path="/" element={<Navigate to="/client/stores" />} />
                <Route path="/stores" element={<Stores />} />             
                <Route path="/stores/:id" element={<ClientStoreView />} /> 
                <Route path='/stores/:id/shopping-cart' element={<ShoppingCartView />} />
                <Route path='/stores/:id/shopping-cart/payment' element={<PaymentView />} />
               </Routes>
            </div>
        </motion.div>)
}

export default ClientHomeView;