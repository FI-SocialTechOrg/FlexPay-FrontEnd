import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import './styles/Store.css';
import {ProductEditCard, EditProduct, AddProductStock} from '../../elements/Elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import StoreService from '../../../service/StoreService';
import ProductStockRequest from '../../../model/dto/request/ProductStockRequest';
import ProductStockService from "../../../service/ProductStockService";

function OwnerStoreView() {
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [storeData, setStoreData] = useState(null);
    const [productStocks, setProductStocks] = useState([]);
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);
    const storeService = new StoreService();
    const productStockService = new ProductStockService();


    useEffect(() => {
        getStoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStoreData = async () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const id = user.id;
        const token = user.token;
        try {
            const storeRes = await storeService.getStoreByAccountId(id, token);
            if(storeRes.status === 200 || storeRes.status === 201){
                setStoreData(storeRes.data.data);
                setProductStocks(storeRes.data.data.productStocks)
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditProductOpen(true);
    };

    const handleSaveProduct = async (updatedProduct) => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;

        const productStockRequest = new ProductStockRequest(
            updatedProduct.price,
            updatedProduct.mountStock,
            updatedProduct.product,
            updatedProduct.store,
            updatedProduct.stateStock
        );

        console.log('id y token:', updatedProduct.id, token);
        console.log('Producto actualizado:', productStockRequest);
        try {
            const updateRes = await productStockService.updateProductStock(updatedProduct.id, productStockRequest, token);
            if (updateRes.status === 200 || updateRes.status === 201) {
                toast.success("Producto actualizado con éxito", {
                    position: "top-center",
                    style: { background: '#white', color: '#000' },
                    progressStyle: { background: '#53b64f' },
                    autoClose: 1000,
                });
                getStoreData(); // Refrescar la lista de productos
                setIsEditProductOpen(false);
                setSelectedProduct(null);
                setIsCreatingProduct(false);
            }
        } catch (error) {
            console.log('Error al actualizar el producto:', error);
        }
    };

    const handleCreateProduct = async (newProductStock) => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const token = user.token;

        const productStockRequest = new ProductStockRequest(
            newProductStock.price,
            newProductStock.mountStock,
            newProductStock.product,
            newProductStock.store,
            newProductStock.stateStock
        );

        console.log('Producto a crear:', productStockRequest);
        try {
            const createRes = await productStockService.createProductStock(productStockRequest, token);
            if (createRes.status === 200 || createRes.status === 201) {
                toast.success("Producto creado con éxito", {
                    position: "top-center",
                    style: { background: '#white', color: '#000' },
                    progressStyle: { background: '#53b64f' },
                    autoClose: 1000,
                });
                getStoreData(); // Refrescar la lista de productos
                setIsEditProductOpen(false);
                setSelectedProduct(null);
                setIsCreatingProduct(false);
            }
        } catch (error) {
            toast.error("El producto no se pudo agregar porque ya existe en el stock de esta tienda", {
                position: "top-center",
                style: { background: '#white', color: '#000' },
                progressStyle: { background: '#e74c3c' },
                autoClose: 1000,
            });
            console.log('Error al crear el producto:', error);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsCreatingProduct(true);
    };

    const handleClose = () => {
        console.log('Cerrando edición de producto');
        setIsEditProductOpen(false);
        setSelectedProduct(null);
        setIsCreatingProduct(false);
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
          <button className='store-add-button' onClick={handleAddProduct}>
            <FontAwesomeIcon icon={faPlusCircle} style={{ paddingRight: '5px' }} />
            Agregar producto
          </button>
          <button className="store-fixed-add-button" onClick={handleAddProduct}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="product-cards">
          {productStocks.map(product => (
            <ProductEditCard key={product.id} product={product} onEdit={() => handleEditProduct(product)} />
          ))}
        </div>

        {isEditProductOpen && selectedProduct && (
          <EditProduct
            productSelected={selectedProduct}
            idStore={storeData.id}
            onEdit={handleSaveProduct}
            onClose={handleClose}
          />
        )}

        {isCreatingProduct && (
          <AddProductStock
              idStore={storeData.id}
              onSave={handleCreateProduct}
              onClose={handleClose}
          />
        )}
      </div>
    </motion.div>
  );
}

export default OwnerStoreView;
