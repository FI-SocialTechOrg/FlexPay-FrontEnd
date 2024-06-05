import { motion } from "framer-motion";
import Navbar from '../../elements/Navbar';

function ClientStoreView() {
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', width: '100%'}}
        >   
        <Navbar />
                   
        </motion.div>
    )
}

export default ClientStoreView;