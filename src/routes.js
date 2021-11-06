import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import Edit from './pages/Edit';
import MTAdmin from './pages/MTAdmin/MTAdminCreate';
import MTAdminEdit from './pages/MTAdmin/MTAdminEdit';
import MTAdminApprove from './pages/MTAdmin/MTAdminApprove';
import MTAdminEnd from './pages/MTAdmin/MTAdminEnd';
import MTContractsAvailable from './pages/MTUser/MTContractsAvailable';
import MTContractsAccepted from './pages/MTUser/MTContractsAccepted';
import MTContractsDone from './pages/MTUser/MTContractsDone';
import MTContractsDisplay from './pages/MTAdmin/MTContractsDisplay';
import SalesAttendance from './pages/Sales/Attendance';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router({ isLoggedIn }) {
  return useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        {
          path: 'products',
          element: <Products />
        },
        { path: 'blog', element: <Blog /> },
        { path: 'register', element: <Register /> },
        { path: 'edit', element: <Edit /> },
        { path: 'movetech/create', element: <MTAdmin /> },
        { path: 'movetech/display-contracts', element: <MTContractsDisplay /> },
        { path: 'movetech/edit-quotation', element: <MTAdminEdit /> },
        { path: 'movetech/approve-quotation', element: <MTAdminApprove /> },
        { path: 'movetech/end-quotation', element: <MTAdminEnd /> },
        { path: 'movetech/quotation-available', element: <MTContractsAvailable /> },
        { path: 'movetech/quotation-accepted', element: <MTContractsAccepted /> },
        { path: 'movetech/quotation-done', element: <MTContractsDone /> },
        { path: 'sales/attendance', element: <SalesAttendance /> }
      ]
    },
    {
      path: '/',
      element: isLoggedIn ? <Navigate to="/dashboard/app" /> : <LogoOnlyLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
