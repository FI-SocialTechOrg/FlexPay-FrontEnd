import React from 'react';
import logo from '../assets/flexpay_logo.png';
import './styles/Navbar.css';
import { useNavigate } from 'react-router-dom';


function Navbar404() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const role = user.role;
        if(role === 1) {
            navigate('/client/stores')
        } else {
            navigate('/store')
        }
    }

    return (
        <div className="navbar">
            <img className="navbar-logo" src={logo} alt="logo" onClick={handleLogoClick}/>
            <div className="right-nav">
                <div className='interactive'>
                    <div className="account-dropdown">
                        <h4 style={{color:"lightgray"}}>Usuario no encontrado</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar404;
