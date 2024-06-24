import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/views/authentication/Auth';
import Welcome from './components/views/configuration/Welcome';
import ClientHomeView from './components/views/home/ClientHomeView';
import StoreHomeView from './components/views/home/StoreHomeView';
import Error404 from './components/views/error/Error404';
import { AnimatePresence } from "framer-motion";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getInitialUserState = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          return JSON.parse(storedUser);
      } else {
          return { isLoggedIn: false, id: null, token: null, account: null, role: null, isExistCreditTerms: false};
      }
  };

  const [user, setUser] = useState(getInitialUserState);

  useEffect(() => {
      console.log('loggedUser:', user);
  }, [user]);

  const PrivateRoute = ({ element: Component, isLoggedIn, allowedType, ...rest }) => {
      return isLoggedIn && user.role === allowedType ? (
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
                  <Route path="/welcome" element={<PrivateRoute element={Welcome} isLoggedIn={user.isLoggedIn} allowedType={1} />} />
                  <Route path="/client/*" element={<PrivateRoute element={ClientHomeView} isLoggedIn={user.isLoggedIn} allowedType={1} />} />
                  <Route path="/store/*" element={<PrivateRoute element={StoreHomeView} isLoggedIn={user.isLoggedIn} allowedType={2} />} />
                  <Route path="*" element={user.isLoggedIn ? <Error404 /> : <Navigate to="/auth" />} />
              </Routes>
          </AnimatePresence>
      </Router>
  );
}

export default App;
