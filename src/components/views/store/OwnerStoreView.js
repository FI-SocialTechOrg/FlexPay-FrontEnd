import React, { useState } from 'react';
import { motion } from "framer-motion";
import './styles/Store.css';
import { ProductEditCard, EditProduct } from '../../elements/Elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

function OwnerStoreView() {
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        { id: 1, name: 'Plátano de seda x kg', price: 2.69, stock: 50, imageUrl: '' },
        { id: 2, name: 'Arándanos 500g', price: 13.99, stock: 20, imageUrl: '' },
        { id: 3, name: 'Atún Campomar', price: 5.90, stock: 26, imageUrl: '' },
        { id: 4, name: 'Avena Quaker 900g', price: 14.50, stock: 16, imageUrl: '' },
    ];

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditProductOpen(true);
    };

    const handleSaveProduct = (updatedProduct) => {
        console.log('Guardando producto actualizado:', updatedProduct);
         toast.success("Producto actualizado con éxito", {
                position: "top-center",
                style: { background: '#white', color: '#000' },
                progressStyle: { background: '#53b64f' },
                autoClose: 1000,
            });
        setIsEditProductOpen(false);
        setSelectedProduct(null);
    };

    const handleClose = () => {
        console.log('Cerrando edición de producto');
        setIsEditProductOpen(false);
        setSelectedProduct(null);
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className='store-container'>
        <div className="top-row small-center">
          <h1 className='store-container-title'>Productos</h1>
          <button className='store-add-button'>
            <FontAwesomeIcon icon={faPlusCircle} style={{ paddingRight: '5px' }} />
            Agregar producto
          </button>
          <button className="store-fixed-add-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="product-cards">
          {products.map(product => (
            <ProductEditCard key={product.id} product={product} onEdit={() => handleEditProduct(product)} />
          ))}
        </div>

        {isEditProductOpen && selectedProduct && (
          <EditProduct
            product_id={selectedProduct.id}
            product_name={selectedProduct.name}
            product_price={selectedProduct.price.toString()}
            product_stock={selectedProduct.stock.toString()}
            image={selectedProduct.imageUrl}  // Asegúrate de pasar la imagen si la tienes
            onEdit={handleSaveProduct}
            onClose={handleClose}
          />
        )}

      </div>
    </motion.div>
  );
}

export default OwnerStoreView;
