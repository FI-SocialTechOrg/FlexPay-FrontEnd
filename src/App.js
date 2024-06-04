import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './components/views/authentication/Auth';
import { AnimatePresence } from "framer-motion";

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
          </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
