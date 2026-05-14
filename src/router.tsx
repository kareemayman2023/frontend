import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import App from './App'
import AllDoctors from './pages/AllDoctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Doctor from './pages/Doctor'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminAppointments from './pages/AdminAppointments'
import AdminAddDoctor from './pages/AdminAddDoctor'
import AdminDoctorsList from './pages/AdminDoctorsList'
import DoctorLayout from './layouts/DoctorLayout'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorAppointments from './pages/DoctorAppointments'
import DoctorProfile from './pages/DoctorProfile'
import PaitentCompleteProfile from './pages/PaitentCompleteProfile'
import CheckAuth from './CheckAuth'
import ScrollToTop from './ScrollToTop'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import PreVisitPage from './pages/PreVisitPage'
import MyMedicalHistory from './pages/MyMedicalHistory'
import PatiantDetails from './pages/PatientDetails'
import Checkout from './components/Checkout'
const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CheckAuth>
        <ScrollToTop />
        <DefaultLayout />
      </CheckAuth>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/all-doctors',
        element: <AllDoctors />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/doctor/:id',
        element: <Doctor />,
      },
      {
        path: '/my-profile',
        element: <MyProfile />,
      },
      {
        path: '/my-appointments',
        element: <MyAppointments />,
      },
      {
        path: '/pre-visit/:id',
        element: <PreVisitPage />,
      },
      {
        path: '/my-medical-history',
        element: <MyMedicalHistory />,
      },
      {
        path: '/payment',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/admin-panel',
    element: (
      <CheckAuth>
        <ScrollToTop />
        <AdminLayout />
      </CheckAuth>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: '/admin-panel/appointments',
        element: <AdminAppointments />,
      },
      {
        path: '/admin-panel/add-doctor',
        element: <AdminAddDoctor />,
      },
      {
        path: '/admin-panel/doctors-list',
        element: <AdminDoctorsList />,
      },
    ],
  },
  {
    path: '/doctor-panel',
    element: (
      <CheckAuth>
        <ScrollToTop />
        <DoctorLayout />
      </CheckAuth>
    ),
    children: [
      {
        index: true,
        element: <DoctorDashboard />,
      },
      {
        path: '/doctor-panel/appointments',
        element: <DoctorAppointments />,
      },
      {
        path: '/doctor-panel/profile',
        element: <DoctorProfile />,
      },
      {
        path: '/doctor-panel/patient/:id',
        element: <PatiantDetails />,
      },
    ],
  },
  {
    path: '/complete-profile',
    element: (
      <CheckAuth>
        <PaitentCompleteProfile />
      </CheckAuth>
    ),
  },
])

export default Router
