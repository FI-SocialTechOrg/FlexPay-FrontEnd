import './styles/ElementsStyles.css'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; 
import '../assets/store_icon.png'; 
import '../assets/no_image_available.jpg';

function TextInput({ type, placeholder, inputMode }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-input"
      inputMode={inputMode}
    />
  );
}

function Button({ text, alignment}) {
  return (
  <button 
    className="colored-button"
    type="submit"
    style={{alignSelf: alignment}}
    > {text} </button>);
}

function RedirectButton({ text, href }) {
  return (
    <Link 
      className="colored-button" 
      to={href}
    > 
      {text} 
    </Link>
  );
}

function StoreButton({ id, name, logo, ruc }) {
  const defaultLogo = require('../assets/store_icon.png'); 

  return (
    <div className="store-card">
      <img src={logo || defaultLogo} alt={`${name} logo`} className="store-logo" />
      <div className='store-info'>
        <h3>{name}</h3>
        <p>RUC: {ruc}</p>
        <RedirectButton text="Ver tienda" href={`${id}`} />
      </div>
    </div>
  );
}

function RadioButton({ text, name, value, onChange }) {
  return (
    <label className="radio-button">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={value === 'client'}
      />
      {text}  
    </label>
  );
}

function CustomLink({ text, href, alignment }) {
  return (
    <Link className="link" 
      to = {href}
      style={{alignSelf: alignment}}
    > {text} 
    </Link>
  );
}

function CustomOptions({ text }) {
  return (
    <button className="options-button"> 
      {text} 
      <FontAwesomeIcon icon={faChevronDown} className="options-icon" /> 
    </button>
  );
}


function DropDownLight({ options, onChange }) {
  return (
    <select className="dropdown-light" onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

function ProductCard({ product, onAddToCart }) {
  const defaultproductimg = require('../assets/no_image_available.jpg');
  const { id, name, price, stock, imageUrl } = product;
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
      onAddToCart(id);
      setAddedToCart(true);
  };

  return (
      <div className="product-card">
          <img src={imageUrl || defaultproductimg} alt={name} className="product-image" />
          <h3>{name}</h3>
          <div className="product-price">
            <p className='product-label'>Precio:</p>
            <p className='price'>S/ {price}</p>
          </div>
          <p className='stock'>Stock: {stock} unidades</p>
          <button onClick={handleAddToCart} disabled={addedToCart}>
              {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
          </button>
      </div>
  );
}

export { 
  TextInput, 
  Button, 
  RedirectButton, 
  StoreButton, 
  CustomOptions, 
  RadioButton, 
  CustomLink, 
  DropDownLight,
  ProductCard
};