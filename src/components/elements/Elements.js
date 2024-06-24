import './styles/ElementsStyles.css'
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faClose, faEdit, faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import '../assets/store_icon.png'; 
import '../assets/no_image_available.jpg';
import ProductService from '../../service/ProductService';
import ProductRequest from "../../model/dto/request/ProductRequest";
import ProductStockRequest from "../../model/dto/request/ProductStockRequest";

function TextInput({ type, placeholder, inputMode, value, onChange, max, maxWidth, maxHeight }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-input"
      inputMode={inputMode}
      value={value} 
      onChange={onChange}
      max={max}
      style={{maxWidth: maxWidth || '100%', maxHeight: maxHeight}}
    />
  );
}

function TextInputLight({ type, placeholder, inputMode, value, onChange, maxWidth }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-input-light"
      inputMode={inputMode}
      value={value} 
      onChange={onChange}
      style={{maxWidth: maxWidth || '100%'}}
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

function RedirectButton({ text, href, width, onClick }) {
  return (
    <Link 
      className="colored-button" 
      style={{width: width}}
      to={href}
      onClick={onClick}
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

function RadioButton({ text, name, value, onChange, checked }) {
  return (
    <label className="radio-button">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        
      />
      {text}
    </label>
  );
}

function CustomLink({ text, href, handleClick, alignment, color, fontweight, fontSize, decoration}) {
  return (
    <Link className="link" 
      to = {href}
      onClick={handleClick}
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

function DropDownDark({ options, value, onChange, marginbottom }) {
  return (
    <select className="dropdown-dark"  value={value} onChange={onChange} style={{marginBottom: marginbottom || 0}}>
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
  const { id, name, price, mountStock, imageUrl } = product;
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
      onAddToCart(id);
      setAddedToCart(true);
  };

  return (
      <div className="product-card">
          <img src={product.product.image || defaultproductimg} alt={name} className="product-image" />
          <div className='product-info'>
            <h3>{name}</h3>
            <div className="card-product-price">
              <p className='product-label'>Precio:</p>
              <p className='price'>S/ {parseFloat(price).toFixed(2)}</p>
            </div>
            <p className='stock'>Stock: {mountStock} unidades</p>
            <button onClick={handleAddToCart} disabled={addedToCart}>
                {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
            </button>
          </div>
      </div>
  );
}

function ProductEditCard({ product, onEdit }) {
  const defaultproductimg = require('../assets/no_image_available.jpg');
  //const { id, name, price, stock, imageUrl } = product;

  const handleEditClick = () => {
    console.log('Editando producto con ID:', product.id);
    onEdit(product); 
  };

  return (
    <div className="product-card">
        <img src={product.product.image || defaultproductimg} alt={product.product.name} className="product-image" />
        <div className='product-info'>
        <h3>{product.product.name}</h3>
        <div className="card-product-price">
          <p className='product-label'>Precio:</p>
          <p className='price'>S/ {parseFloat(product.price).toFixed(2)}</p>
        </div>
        <p className='stock'>Stock: {product.mountStock} unidades</p>
        <button onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} style={{ paddingRight: '5px' }} />
          Editar
        </button>
      </div>
    </div>
  );
}

function CartItem({ product, onIncrease, onDecrease, onRemove }) {
  return (
      <div className="cart-item">
          <span className="product-name">{product.product.name}</span>
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



function EditProduct({ productSelected, idStore, onEdit, onClose}) {
  const [price, setPrice] = useState(productSelected.price);
  const [stock, setStock] = useState(productSelected.mountStock);


  const handleEdit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: productSelected.id,
      price: parseFloat(price),
      mountStock: parseInt(stock),
      product:productSelected.product.id,
      store: idStore,
      stateStock: productSelected.stateStock.id,

    };

    onEdit(updatedProduct);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeStock = (e) => {
    setStock(e.target.value);
  };

  const handleClose = (e) => {
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1,}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.3, delay: 0 }}
     className='layer'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className='edit-product-card'
        >
          <form className='edit-form'>
            <FontAwesomeIcon icon={faClose} className='cancel-icon' onClick={handleClose} />
            <div className='edit-group'>
              <p className='edit-label'>Precio:</p>
              <p className='edit-label'>S/</p>
              <TextInputLight
                type='text'
                placeholder='Precio'
                value={price}
                maxWidth='30%'
                onChange={handleChangePrice}
              />
            </div>

            <div className='edit-group'>
              <p className='edit-label'>Stock:</p>
              <TextInputLight
                type='text'
                placeholder='Stock'
                value={stock}
                maxWidth='20%'
                onChange={handleChangeStock}
              />
              <p className='edit-label'>unidades</p>
            </div>

            <Button text='Guardar' alignment='center' onClick={handleEdit} width='100%' />
          </form>
        </motion.div>
    </motion.div>
  );
}

function AddProductStock({ idStore, onSave, onClose }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const productService = new ProductService();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;

        try {
            const response = await productService.getProducts(token);
            if (response.status === 200) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSaveProductStock  = (e) => {
        e.preventDefault();
        const newProductStock  = {
            price: parseFloat(price),
            mountStock: parseInt(stock, 10),
            product: parseInt(selectedProduct, 10),
            store: idStore,
            stateStock: 1
        };
        onSave(newProductStock);
    };

    const handleAddProduct = () => {
        setShowAddProductForm(true);
    };

    const handleCloseAddProduct = () => {
        setShowAddProductForm(false);
    };

    const handleChangePrice = (e) => setPrice(e.target.value);
    const handleChangeStock = (e) => setStock(e.target.value);
    const handleChangeProduct = (e) => setSelectedProduct(e.target.value);
    const handleClose = () => onClose();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className='layer'
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='edit-product-card2'
            >
                <form className='edit-form2'>
                    <FontAwesomeIcon
                        icon={faClose}
                        className='cancel-icon'
                        onClick={handleClose}
                    />
                    <div className='edit-group'>
                        <p className='edit-label'>Producto:</p>
                        <select
                            value={selectedProduct}
                            onChange={handleChangeProduct}
                            className='select-input'
                        >
                            <option value='' disabled>
                                Seleccione un producto
                            </option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='add-product-section'>
                        <button type="button" className='add-product-button' onClick={handleAddProduct}>
                            <FontAwesomeIcon icon={faPlusCircle} style={{ paddingRight: '5px' }} />
                            Agregar producto nuevo
                        </button>
                    </div>
                    <div className='edit-group'>
                        <p className='edit-label'>Precio:</p>
                        <div className='price-input-group'>
                            <p className='currency-symbol'>S/</p>
                            <TextInputLight
                                type='text'
                                placeholder='Precio'
                                value={price}
                                onChange={handleChangePrice}
                                className='price-input'
                            />
                        </div>
                    </div>
                    <div className='edit-group'>
                        <p className='edit-label'>Stock:</p>
                        <TextInputLight
                            type='text'
                            placeholder='Stock'
                            value={stock}
                            onChange={handleChangeStock}
                            className='stock-input'
                        />
                        <p className='units-label'>unidades</p>
                    </div>
                    <Button
                        text='Guardar'
                        alignment='center'
                        onClick={handleSaveProductStock}
                        className='save-button'
                    />

                    {showAddProductForm && (
                     <AddProduct
                         onClose={handleCloseAddProduct} />
                    )}
                </form>
            </motion.div>
        </motion.div>
    );
}

function AddProduct({onClose}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleCreateProduct = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;
        const productRequest = new ProductRequest(name, description, image);
        const productService = new ProductService();
        try {
            const response = await productService.createProduct(productRequest, token);
            if (response.status === 200 || response.status === 201) {
                console.log('Producto creado:', response.data.data);
                handleClose();
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }


    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeDescription = (e) => setDescription(e.target.value);
    const handleChangeImage = (e) => setImage(e.target.value);
    const handleClose = () => onClose();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className='layer'
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='edit-product-card2'
            >
                    <FontAwesomeIcon
                        icon={faClose}
                        className='cancel-icon'
                        onClick={handleClose}
                    />
                    <div className='edit-group'>
                        <p className='edit-label'>Nombre:</p>
                        <TextInputLight
                            type='text'
                            placeholder='Nombre'
                            value={name}
                            onChange={handleChangeName}
                            className='price-input'
                        />
                    </div>
                    <div className='edit-group'>
                        <p className='edit-label'>Descripcion:</p>
                        <TextInputLight
                            type='text'
                            placeholder='Descripcion'
                            value={description}
                            onChange={handleChangeDescription}
                            className='price-input'
                        />
                    </div>
                    <div className='edit-group'>
                        <p className='edit-label'>Imagen:</p>
                        <TextInputLight
                            type='text'
                            placeholder='Imagen'
                            value={image}
                            onChange={handleChangeImage}
                            className='stock-input'
                        />
                    </div>
                    <Button
                        text='Guardar'
                        alignment='center'
                        onClick={handleCreateProduct}
                        className='save-button'
                    />
            </motion.div>
        </motion.div>
    );
}

export {
  TextInput, 
  TextInputLight,
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
  PaymentDetailsCard,
  EditProduct,
  AddProductStock,
  AddProduct
};