import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/views/authentication/Auth';
import Welcome from './components/views/configuration/Welcome';
import ClientHomeView from './components/views/home/ClientHomeView';
import StoreHomeView from './components/views/home/StoreHomeView';
import { AnimatePresence } from "framer-motion";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getInitialUserState = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      return { isLoggedIn: false, type: null };
    }
  };

  const [user, setUser] = useState(getInitialUserState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const PrivateRoute = ({ element: Component, isLoggedIn, allowedType, ...rest }) => {
    return isLoggedIn && user.type === allowedType ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/auth" />
    );
  };

  return (
    <Router>
      <AnimatePresence 
        mode='wait'
        onExitComplete={() => window.scrollTo(0, 0)}  
      >
          <Routes>
            <Route exact path="/" element={<Navigate to="/auth" />} />
            <Route exact path="/auth/*" element={<Auth setUser={setUser} />} />
            <Route path="/welcome" element={<PrivateRoute element={Welcome} isLoggedIn={user.isLoggedIn} allowedType="client" />} />
            <Route path="/client/*" element={<PrivateRoute element={ClientHomeView} isLoggedIn={user.isLoggedIn} allowedType="client" />} />
            <Route path="/store/*" element={<PrivateRoute element={StoreHomeView} isLoggedIn={user.isLoggedIn} allowedType="store" />} />
          </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
