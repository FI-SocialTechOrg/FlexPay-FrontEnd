import React from 'react';
import './styles/Form.css'
import { motion } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';
import loginPicture from '../../assets/login_picture.png';
import logo from '../../assets/flexpay_logo.png';
import LogIn from './LogIn'
import Register1 from './Register1';
import Register2 from './Register2';

function Auth() {
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', width: '100vw', height: '100vh',}}
        >
            <div className = "form-container">

                <div className = "left-container">
                    <img className="logo" src={logo} alt="logo"/>
                    <img className="form-picture" src={loginPicture} alt=""/>
                </div>

                <div className = "right-container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/auth/login" />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/register/1" element={<Register1 />} />
                        <Route path="/register/2" element={<Register2 />} />
                    </Routes>  
                </div>
            </div>
        </motion.div>
    )
}

export default Auth;