import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/flexpay_logo.png';
import './styles/Navbar.css'
import { CustomOptions } from "../elements/Elements";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons'; // Icono de carrito de compras
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
    var name = 'Carlos';
    const location = useLocation();
    const currentStoreId = location.pathname.split('/').slice(-1)[0];
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

    const handleCartClick = () => {
        if (location.pathname === '/client/stores') {
            toast.error("Selecciona una tienda antes de ir al carrito", {
                position: "top-center",
                style: { background: '#white', color: '#000' },
                progressStyle: { background: '#007bff' },
                autoClose: 1000,
            });
        } else if (location.pathname.endsWith(`/shopping-cart`)) {
            toast.error("Ya estás en el carrito de compras", {
                position: "top-center",
                style: { background: '#white', color: '#000' },
                progressStyle: { background: '#007bff' },
                autoClose: 1000,
            });
        } else {
            window.location.href = `/client/stores/${currentStoreId}/shopping-cart`;
        }
    };

    return (
        
        <div className="navbar">
            <img className="navbar-logo" src={logo} alt="logo"/>
            <div className="right-nav">
                <div className='interactive'>
                    <div className='navbar-welcome'>
                        <p className='navbar-text'>Bienvenido,</p>
                        <p className='navbar-user'>{name}</p>
                    </div>
                    <div className="account-dropdown">
                        <CustomOptions text = {"Cuenta"} />
                        <div className="account-dropdown-content">
                            <a href="/">Configuración</a>
                            <Link to="/auth/login">Cerrar sesión</Link>
                        </div>
                    </div>
                </div>
                <button 
                    className="shopping-cart-button rounded-border"
                    onClick={handleCartClick}
                >
                    <FontAwesomeIcon icon={faShoppingCart} className="shopping-cart-icon" />
                </button>
                
                <button className="menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                {menuOpen && (
                    <div className="menu-dropdown" ref={menuRef}>
                        <ul>
                            <li><a href="/">Configuración</a></li>
                            <li><Link to="/auth/login">Cerrar sesión</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;
