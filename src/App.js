import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AnimatePresence } from "framer-motion";
import Auth from './components/views/authentication/Auth';
import Welcome from './components/views/configuration/Welcome';
import ClientHomeView from './components/views/home/ClientHomeView';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/client/*" element={<ClientHomeView />} />
          </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
