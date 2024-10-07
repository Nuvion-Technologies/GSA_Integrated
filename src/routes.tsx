// AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import ManagerLogin from './pages/ManagerLogin';
import ManagerDashboard from './pages/ManagerDashboard';
import AcademyForm from './components/AcademyForm';
import PreviewFormPage from './components/PreviewForm';
import EventDetails from './components/EventDetails';
import GalleryPage from './components/GalleryPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TurfBooking from './components/TurfBooking';
import ForgotPassword from './components/Forgot';
import VerifyOTP from './components/Verify';
import ForgotVerifyOTP from './components/ForgotVerify';
import PlaygroundBooking from './components/PlaygroundBooking';
import EditProfile from './components/EditProfile';


const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/manager" element={<ManagerLogin />} />
      <Route
        path="/manager/dashboard"
        element={isAuthenticated ? <ManagerDashboard /> : <Navigate to="/manager" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path='/gallery' element={<GalleryPage />} />
      <Route path='/academy' element={<AcademyForm />} />
      <Route path='/preview' element={<PreviewFormPage />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path='/login'  element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/bookturf' element={<TurfBooking/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/forgotverify' element={<ForgotVerifyOTP/>}/>
      <Route path='/verify' element={<VerifyOTP/>}/>
      <Route path='/playground' element={<PlaygroundBooking/>}/>
      <Route path='/editprofile' element={<EditProfile/>}/>
    </Routes>
  );
};

export default AppRoutes;