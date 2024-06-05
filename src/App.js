import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './components/views/authentication/Auth';
import Welcome from './components/views/configuration/Welcome';
import { AnimatePresence } from "framer-motion";
import ClientStoreView from './components/views/store/ClientStoreView';

function App() {

  return (
    <Router>
      <AnimatePresence 
        mode='wait'
        onExitComplete={() => window.scrollTo(0, 0)}  
      >
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/store/*" element={<ClientStoreView/>} />
          </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
