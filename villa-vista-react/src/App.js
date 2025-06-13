

// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import HomePage from './component/home/HomePage';
import AllVillaPage from './component/booking_villas/AllVillaPage';
import VillaDetailsBookingPage from './component/booking_villas/VillaDetailsPage';
import FindBookingPage from './component/booking_villas/FindBookingPage';
import AdminPage from './component/admin/AdminPage';
import ManageVillaPage from './component/admin/ManageVillaPage';
import EditVillaPage from './component/admin/EditVillaPage';
import AddVillaPage from './component/admin/AddVillaPage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';
import EditBookingPage from './component/admin/EditBookingPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import { ProtectedRoute, AdminRoute } from './service/guard';
import ContactPage from './component/common/ContactUs';
import AboutPage from './component/common/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/villa" element={<AllVillaPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />
            <Route path="/ContactUs" element={<ContactPage />} />
            <Route path="/AboutUs" element={<AboutPage />} />


            

            {/* Protected Routes */}
            <Route path="/villa-details-book/:villaId"
              element={<ProtectedRoute element={<VillaDetailsBookingPage />} />}
            />
            <Route path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route path="/admin/manage-villa"
              element={<AdminRoute element={<ManageVillaPage />} />}
            />
            <Route path="/admin/edit-villa/:villaId"
              element={<AdminRoute element={<EditVillaPage />} />}
            />
            <Route path="/admin/add-villa"
              element={<AdminRoute element={<AddVillaPage />} />}
            />
            <Route path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
