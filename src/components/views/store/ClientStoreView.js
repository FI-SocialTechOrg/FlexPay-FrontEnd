import { motion } from "framer-motion";
import Navbar from '../../elements/Navbar';

function ClientStoreView() {
    
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
                
            </div>

        </motion.div>
    )
}

export default ClientStoreView;