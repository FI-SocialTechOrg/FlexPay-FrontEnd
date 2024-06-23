import React, { useState } from 'react';
import './styles/Store.css';
import { motion } from 'framer-motion';
import { StoreButton } from '../../elements/Elements';
import StoreService from '../../../service/StoreService';

function Stores() {
    const [stores, setStores] = useState([]);
    const storeService = new StoreService();

    const getStores = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;

        try{
            const storeRes = await storeService.getStores(token);
            const stores = storeRes.data.data;
            setStores(stores);

        } catch (error) {
            console.log(error);
        }
    }

    useState(() => {
        getStores();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <div className='stores-list-container'>
                <h1 className='stores-list-title'>Selecciona tu tienda</h1>
                <div className="stores-list">
                    {stores.map(store => (
                        <StoreButton
                        key={store.id}
                        id={store.id}
                        name={store.companyName}
                        logo={store.imageUrl}
                        ruc={store.ruc}
                        />
                    ))}
                </div>
            </div>
        </motion.div>)
}

export default Stores;