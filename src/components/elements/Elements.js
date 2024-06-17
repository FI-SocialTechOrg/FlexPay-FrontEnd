import './styles/ElementsStyles.css'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import '../assets/store_icon.png'; 
import '../assets/no_image_available.jpg';

function TextInput({ type, placeholder, inputMode, value, onChange, max }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-input"
      inputMode={inputMode}
      value={value} 
      onChange={onChange}
      max={max}
    />
  );
}

function Button({ text, alignment, onClick, disabled}) {
  return (
  <button 
    className="colored-button"
    type="submit"
    onClick={onClick}
    style={{alignSelf: alignment}}
    disabled={disabled || false}
    > {text} </button>);
}

function RedirectButton({ text, href, width }) {
  return (
    <Link 
      className="colored-button" 
      style={{width: width}}
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

function CustomLink({ text, href, alignment, color, fontweight, fontSize }) {
  return (
    <Link className="link" 
      to = {href}
      style={{alignSelf: alignment || 'center', color: color || '#1983FF', fontWeight: fontweight|| 'normal'}}
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

function DropDownDark({ options, onChange, marginbottom }) {
  return (
    <select className="dropdown-dark" onChange={onChange} style={{marginBottom: marginbottom || 0}}>
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
          <div className="card-product-price">
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

function CartItem({ product, onIncrease, onDecrease, onRemove }) {
  return (
      <div className="cart-item">
          <span className="product-name">{product.name}</span>
          <div className="quantity-control">
              <button className="quantity-button" onClick={() => onDecrease(product.id)}>
                  -
              </button>
              <span className="product-quantity">{product.quantity}</span>
              <button className="quantity-button" onClick={() => onIncrease(product.id)}>
                  +
              </button>
          </div>
          <span className="product-price">S/ {(product.quantity * product.price).toFixed(2)}</span>
          <button className="remove-button" onClick={() => onRemove(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
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
  DropDownDark,
  ProductCard,
  CartItem,
};