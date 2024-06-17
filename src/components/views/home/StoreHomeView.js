import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../elements/Navbar';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import OwnerStoreView from '../store/OwnerStoreView';

function StoreHomeView() {
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
                <Route path="/" element={<Navigate to="/store/products" />} />
                <Route path="/products" element={<OwnerStoreView />} />             
               </Routes>
            </div>
        </motion.div>)
}

export default StoreHomeView;