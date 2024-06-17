import React, { useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../elements/Navbar';
import { motion } from "framer-motion";
import { Button, CartItem } from '../../elements/Elements';
import { ToastContainer } from 'react-toastify';
import './styles/Store.css';
import list_icon from '../../assets/list_icon.png'; 

const productsList = [
    { id: 1, name: 'Plátano de seda x kg', price: 2.69, stock: 50, quantity: 1 },
    { id: 2, name: 'Arándanos 500g', price: 13.99, stock: 20, quantity: 1 },
    { id: 3, name: 'Atún Campomar', price: 5.90, stock: 26, quantity: 1 },
    { id: 4, name: 'Avena Quaker 900g', price: 14.50, stock: 16, quantity: 1 },
];

function ShoppingCartView() {
    const [products, setProducts] = useState(productsList);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currentStoreId = location.pathname.split('/')[3];

    const handleIncrease = (id) => {
        setProducts(products.map(product =>
            product.id === id && product.quantity < product.stock
                ? { ...product, quantity: product.quantity + 1 }
                : product
        ));
    };

    const handleDecrease = (id) => {
        setProducts(products.map(product =>
            product.id === id && product.quantity > 1
                ? { ...product, quantity: product.quantity - 1 }
                : product
        ));
    };

    const handleRemove = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handlePaymentRedirect = () => {
        if (acceptedTerms) {
            console.log('Redirigiendo al pago...');
            navigate(`/client/stores/${currentStoreId}/shopping-cart/payment`)
        } 
    };

    const totalAmount = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
        >
            <ToastContainer />
            <Navbar />
            <div className='store-container'>
                <h1 className='store-container-title'>Carrito de compras</h1>
                <div className="cart-container" style={{ display: 'flex' }}>
                    <div className="list">
                        <h3 className="store-container-subtitle">Productos</h3>
                        {products.map(product => (
                            <CartItem
                                key={product.id}
                                product={product}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                    <div className="summary-card">
                        <img src={list_icon} alt="list icon" className="list-icon" />
                        <div className="ammount">
                            <p>Total </p>
                            <p className="black">S/ {totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="checkbox-text">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                            />
                            <label htmlFor="terms">
                                He leído y acepto los <a href="/">Términos y condiciones</a> y la <a href="/">Política de Privacidad</a>
                            </label>
                        </div>
                        <Button
                            text={'Ir a pagar'}
                            onClick={handlePaymentRedirect}
                            disabled={!acceptedTerms}
                            width='100%'
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ShoppingCartView;
