import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AnimatePresence } from "framer-motion";
import Auth from './components/views/authentication/Auth';
import Welcome from './components/views/configuration/Welcome';
import ClientStoreView from './components/views/store/ClientStoreView';
import Stores from './components/views/store/Stores';

function App() {

  return (
    <Router>
      <AnimatePresence 
        mode='wait'
        onExitComplete={() => window.scrollTo(0, 0)}  
      >
          <Routes>
            <Route exact path="/" element={<Navigate to="/auth" />} />
            <Route exact path="/auth/*" element={<Auth />} />
            <Route path="/client/welcome" element={<Welcome />} />
            <Route path="/client/stores" element={<Stores />} />             
            <Route path="/client/stores/:id" element={<ClientStoreView />} /> 
            </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
