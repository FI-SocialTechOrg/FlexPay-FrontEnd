import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/flexpay_logo.png';
import './styles/Navbar.css';
import { CustomOptions } from "../elements/Elements";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons'; // Icono de carrito de compras
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
    const name = 'Carlos';
    const storeName = 'Minimarket Vega';

    const location = useLocation();
    const navigate = useNavigate();

    const isUserClient = location.pathname.includes('/client');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleLogoClick = () => {
        if(isUserClient) {
            navigate('/client/stores')
        } else {
            navigate('/store')
        }
    }

    const handleCartClick = () => {
        if (location.pathname === '/client/stores') {
            toast.error("Selecciona una tienda antes de ir al carrito", {
                position: "top-center",
                style: { background: '#FFFFFF', color: '#000000' }, 
                autoClose: 1000,
            });
        } else if (location.pathname.includes('/payment')) {
            const parts = location.pathname.split('/');
            const currentStoreId = parts[parts.length - 3];
            navigate(`/client/stores/${currentStoreId}/shopping-cart`);
        } else if (location.pathname.includes('/shopping-cart')) {
            // No hacer nada si ya estamos en la página del carrito de compras
        } else {
            const parts = location.pathname.split('/');
            const currentStoreId = parts[parts.length - 1];
            navigate(`/client/stores/${currentStoreId}/shopping-cart`);
        }
    };
    
    return (
        <div className="navbar">
            <img className="navbar-logo" src={logo} alt="logo" onClick={handleLogoClick}/>
            <div className="right-nav">
                <div className='interactive'>
                    <div className='navbar-welcome'> 
                    {isUserClient && (
                        <>
                            <p className='navbar-text'>Bienvenido,</p>
                            <p className='navbar-user'>{name}</p> 
                        </>
                    )}
                    {!isUserClient && (
                        <p className='navbar-user'>{storeName}</p>
                    )}
                    </div>
                    <div className="account-dropdown">
                        <CustomOptions text={"Cuenta"} />
                            <div className="account-dropdown-content">
                            {isUserClient && (
                                <>
                                    <Link to="/">Estado de cuenta</Link>
                                </>
                            )}
                            {!isUserClient && (
                                <>
                                    <Link to="/store/configuration">Configuración</Link>
                                </>
                            )}
                            <Link to="/auth/login">Cerrar sesión</Link>
                        </div>
                    </div>
                </div>
                {isUserClient && (
                    <>
                        <button 
                            className="shopping-cart-button rounded-border"
                            onClick={handleCartClick}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="shopping-cart-icon" />
                        </button>
                    </>
                )}
                
                <button className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className={`menu-dropdown ${menuOpen ? 'active' : ''}`} ref={menuRef}>
                    <ul>
                        {isUserClient && (
                            <>
                            <li><Link to="/">Estado de cuenta</Link></li>
                            </>
                        )} 
                        {!isUserClient && (
                            <>
                            <li><Link to="/store/configuration">Configuración</Link></li>
                            </>
                        )}
                        <li><Link to="/auth/login">Cerrar sesión</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
