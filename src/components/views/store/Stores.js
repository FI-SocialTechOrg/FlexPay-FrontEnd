import React from 'react';
import './styles/Store.css';
import { motion } from 'framer-motion';
import { StoreButton } from '../../elements/Elements';
import Navbar from '../../elements/Navbar';

const stores = [
    {
        id: 1,
        name: 'Bodega de la esquina',
        logo: '',
        ruc: '1234567890'
    },
    {
        id: 2,
        name: 'Panadería',
        logo: '',
        ruc: '0965823451'
    },
    {
        id: 3,
        name: 'Carnicería',
        logo: '',
        ruc: '0987654321'
    },
    {
        id: 4,
        name: 'Minimarket',
        logo: '',
        ruc: '0998546610'
    }, 
];

function Stores() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', flexDirection: 'column', width:'100%', height: '100%',}}
        >
            <Navbar />
            <div className='stores-list-container'>
                <div className='stores-list-title'> 
                    <h1>Selecciona tu tienda</h1>
                </div>
                <div className="stores-list">
                    {stores.map(store => (
                        <StoreButton 
                        key={store.id}
                        id={store.id}
                        name={store.name}
                        logo={store.logo}
                        ruc={store.ruc}
                        />
                    ))}
                </div>
            </div>
        </motion.div>)
}

export default Stores;