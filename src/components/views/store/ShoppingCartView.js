import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button, CartItem } from '../../elements/Elements';
import './styles/Store.css';
import list_icon from '../../assets/list_icon.png';
import ProductStockService from "../../../service/ProductStockService";

function ShoppingCartView() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currentStoreId = location.pathname.split('/')[3];
    const productStockService = new ProductStockService();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        if (storedCart.length > 0) {
            getProducts(storedCart);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProducts = async (cart) => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;
        console.log('Cart:', cart);
        const productsArray = [];
        for (let i = 0; i < cart.length; i++) {
            try {
                const productRes = await productStockService.getProductById(cart[i].id, token);
                if (productRes.status === 200 || productRes.status === 201) {
                    productsArray.push({
                        ...productRes.data.data,
                        quantity: cart[i].quantity // Use the quantity from the cart
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        setProducts(productsArray);
        console.log('Productos:', productsArray);
    }

    const handleIncrease = (id) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product =>
                product.id === id && product.quantity < product.mountStock
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
            updateLocalStorage(updatedProducts);
            return updatedProducts;
        });
    };

    const handleDecrease = (id) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product =>
                product.id === id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            );
            updateLocalStorage(updatedProducts);
            return updatedProducts;
        });
    };

    // Función auxiliar para actualizar el localStorage
    const updateLocalStorage = (products) => {
        const cart = products.map(product => ({
            id: product.id,
            quantity: product.quantity
        }));
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleRemove = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);

        const updatedCart = cart.filter(product => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
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
            style={{ display: 'flex', flexDirection: 'column'}}
        >
            <div className='store-container start'>
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
