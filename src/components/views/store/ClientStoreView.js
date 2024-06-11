import { motion } from "framer-motion";
import './styles/Store.css';
import Navbar from '../../elements/Navbar';
import { ProductCard } from  '../../elements/Elements';

function ClientStoreView() {
    // Datos de ejemplo de productos (puedes obtenerlos de tu backend)
    const products = [
        { id: 1, name: 'Plátano de seda x kg', price: 2.69, stock: 50, imageUrl: '' },
        { id: 2, name: 'Arándanos 500g', price: 13.99, stock: 20, imageUrl: '' },
        { id: 3, name: 'Atún Campomar', price: 5.90, stock: 26, imageUrl: '' },
        { id: 4, name: 'Avena Quaker 900g', price: 14.50, stock: 16, imageUrl: '' },
    ];

    // Función para agregar un producto al carrito
    const handleAddToCart = (productId) => {
        // Aquí irá la lógica para agregar el producto al carrito
        console.log('Producto agregado al carrito con ID:', productId);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', flexDirection: 'column', width:'100%', height: '100%',}}
        >   
            <Navbar />
            <div className='store-container'>
                <h1 className='store-container-title'>Selecciona los productos</h1> 
                <div className="product-cards">
                    {/* Itera sobre el array de productos y renderiza una tarjeta de producto para cada uno */}
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default ClientStoreView;