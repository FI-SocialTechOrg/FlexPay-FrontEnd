import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import StoreService from '../../../service/StoreService';
import './styles/Store.css';
import { ProductCard } from  '../../elements/Elements';
import { useLocation } from 'react-router-dom';

function ClientStoreView() {
    const [productStocks, setProductStocks] = useState([]);
    const storeService = new StoreService();
    const location = useLocation();

    useEffect(() => {
        getProductStocks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProductStocks = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const parts = location.pathname.split('/');
        const currentStoreId = parts[parts.length - 1];
        const token = user.token;
        try {
            const storeRes = await storeService.getStoreById(currentStoreId, token);
            if(storeRes.status === 200 || storeRes.status === 201){
                setProductStocks(storeRes.data.data.productStocks)
                console.log(storeRes.data.data.productStocks);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAddToCart = (productId) => {
        console.log('Producto agregado al carrito con ID:', productId);

        const parts = location.pathname.split('/');
        const currentStoreId = parts[parts.length - 1];

        // Recupera el carrito del localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        // Si no existe un carrito para la tienda actual, crea uno
        if (!cart[currentStoreId]) {
            cart[currentStoreId] = [];
        }

        // Busca si el producto ya está en el carrito de la tienda actual
        const existingProduct = cart[currentStoreId].find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart[currentStoreId].push({ id: productId, quantity: 1 });
        }

        // Guarda el carrito actualizado en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart:', JSON.parse(localStorage.getItem('cart')));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <div className='store-container'>
                <h1 className='store-container-title'>Selecciona los productos</h1>
                <div className="product-cards">
                    {productStocks.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </div>
        </motion.div>
    );

}

export default ClientStoreView;