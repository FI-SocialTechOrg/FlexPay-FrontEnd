import {motion} from "framer-motion";
import {ToastContainer} from "react-toastify";
import Navbar404 from "../../elements/Navbar404";
import React from "react";

function Error404() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0}}
            style={{display: 'flex', flexDirection: 'column', width:'100%', height: '100%',}}
        >
            <ToastContainer />
            <Navbar404/>
            <div className='error'>
                <h1 style={{marginTop: 100 ,textAlign: 'center', color: 'lightgray'}}>Error 404: This page is not exist</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/755/755014.png" alt="Error 404"
                     style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }} />

            </div>
        </motion.div>
    );
}

export default Error404;