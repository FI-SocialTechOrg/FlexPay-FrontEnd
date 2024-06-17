import './styles/ElementsStyles.css'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; 
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

function Button({ text, alignment, onClick, disabled, width}) {
  return (
  <button 
    className="colored-button"
    type="submit"
    onClick={onClick}
    style={{alignSelf: alignment, width: width}}
    disabled={disabled || false}
    > {text} </button>);
}

function RedirectButton({ text, href, width, disabled }) {
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

function CustomLink({ text, href, alignment, color, fontweight, fontSize, decoration}) {
  return (
    <Link className="link" 
      to = {href}
      style={{alignSelf: alignment || 'center', color: color || '#1983FF', fontWeight: fontweight|| 'normal', fontSize: fontSize, textDecoration: decoration || 'none'}}
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
          <div className='product-info'>
            <h3>{name}</h3>
            <div className="card-product-price">
              <p className='product-label'>Precio:</p>
              <p className='price'>S/ {parseFloat(price).toFixed(2)}</p>
            </div>
            <p className='stock'>Stock: {stock} unidades</p>
            <button onClick={handleAddToCart} disabled={addedToCart}>
                {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
            </button>
          </div>
      </div>
  );
}

function ProductEditCard({ product, onEdit }) {
  const defaultproductimg = require('../assets/no_image_available.jpg');
  const { id, name, price, stock, imageUrl } = product;

  const handleEdit = () => {
      onEdit(id);
  };

  return (
      <div className="product-card">
          <img src={imageUrl || defaultproductimg} alt={name} className="product-image" />
          <div className='product-info'>
            <h3>{name}</h3>
            <div className="card-product-price">
              <p className='product-label'>Precio:</p>
              <p className='price'>S/ {parseFloat(price).toFixed(2)}</p>
            </div>
            <p className='stock'>Stock: {stock} unidades</p>
            <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} style={{paddingRight: '5px'}}/>
                Editar
            </button>
          </div>
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

function PaymentDetailsCard ({ remainingAmount, selectedOption, interestRate, interest, totalToPay, onAccept }) {
  return (
          <div className='payment-details-card'>
            <h2>Detalle</h2>
            <p>Monto a financiar: S/ {remainingAmount.toFixed(2)}</p>
            <p>Cuotas: {selectedOption === '0' ? 'Sin cuotas' : `${selectedOption} cuotas`}</p>
            <p>Tasa {selectedOption === '0' ? 'Nominal' : 'Efectiva'} Mensual: {interestRate * 100}%</p>
            <p>Interés: S/ {interest.toFixed(2)}</p>
            <hr />
            <p>Total a pagar: S/ {totalToPay.toFixed(2)}</p>
            {selectedOption !== '0' && (
                <div style={{width: '100%', marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                  <CustomLink href="#" text="Ver cronograma de pago" alignment="center" color="blue" fontweight="300" fontSize="small" decoration="underline"/>
                </div>
            )}
            <Button text='Aceptar' alignment='center' onClick={onAccept} width={'100%'}/>
          </div>
  );
};


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
  ProductEditCard,
  CartItem,
  PaymentDetailsCard
};