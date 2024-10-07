// App.tsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
};

const MainContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup','/forgotpassword','/verify','/forgotverify']; // Add more paths if needed

  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      
      <main>
        <AppRoutes />
      </main>

      {/* Conditionally render Footer based on the current route */}
      {!hideNavbarPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
