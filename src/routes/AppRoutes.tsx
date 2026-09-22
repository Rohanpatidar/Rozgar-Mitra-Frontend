import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/Signup";
import CategoryDetail from "../pages/CategoryDetail/CategoryDetail";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import LabourRoute from "./LabourRoute";
import { AdminLayout } from "../components/admin/AdminLayout";
import { CustomerLayout } from "../components/customer/CustomerLayout";
import { LabourLayout } from "../pages/Labour/views/LabourLayout";
import { ROUTES } from "../utils/constants";

const CustomerServices = lazy(() => import('../pages/Customer/views/CustomerServices').then(({ CustomerServices: page }) => ({ default: page })));
const CustomerBookings = lazy(() => import('../pages/Customer/views/CustomerBookings').then(({ CustomerBookings: page }) => ({ default: page })));
const CustomerProfile = lazy(() => import('../pages/Customer/views/CustomerProfile').then(({ CustomerProfile: page }) => ({ default: page })));
const LabourDashboard = lazy(() => import('../pages/Labour/views/LabourDashboard').then(({ LabourDashboard: page }) => ({ default: page })));
const LabourProfile = lazy(() => import('../pages/Labour/views/EditProfile').then(({ EditProfile: page }) => ({ default: page })));
const LabourServices = lazy(() => import('../pages/Labour/views/ServicesList').then(({ ServicesList: page }) => ({ default: page })));
const LabourOpenServices = lazy(() => import('../pages/Labour/views/OpenServices').then(({ OpenServices: page }) => ({ default: page })));
const LabourCompletedServices = lazy(() => import('../pages/Labour/views/CompletedServices').then(({ CompletedServices: page }) => ({ default: page })));
const AdminOverview = lazy(() => import('../pages/Admin/views/Overviews').then(({ Overview: page }) => ({ default: page })));
const AdminCustomers = lazy(() => import('../pages/Admin/views/Customers').then(({ Customers: page }) => ({ default: page })));
const AdminLabours = lazy(() => import('../pages/Admin/views/Labours').then(({ Labours: page }) => ({ default: page })));
const AdminServices = lazy(() => import('../pages/Admin/views/Services').then(({ Services: page }) => ({ default: page })));
const AdminTasks = lazy(() => import('../pages/Admin/views/Tasks').then(({ Tasks: page }) => ({ default: page })));
const AdminProfile = lazy(() => import('../pages/Admin/views/AdminProfile').then(({ AdminProfile: page }) => ({ default: page })));

const RouteLoading = () => <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

const AppRoutes = () => {
    return (
        <Suspense fallback={<RouteLoading />}>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path={ROUTES.SIGNUP} element={<Signup />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route element={<CustomerLayout />}>
                        <Route path={ROUTES.HOME} element={<CustomerServices />} />
                        <Route path={`${ROUTES.HOME}/bookings`} element={<CustomerBookings />} />
                        <Route path={`${ROUTES.HOME}/profile`} element={<CustomerProfile />} />
                    </Route>
                    <Route path={ROUTES.CATEGORY_DETAIL} element={<CategoryDetail />} />
                </Route>

                <Route element={<LabourRoute />}>
                    <Route element={<LabourLayout />}>
                        <Route path={ROUTES.LABOUR} element={<LabourDashboard />} />
                        <Route path={`${ROUTES.LABOUR}/profile`} element={<LabourProfile />} />
                        <Route path={`${ROUTES.LABOUR}/services`} element={<LabourServices />} />
                        <Route path={`${ROUTES.LABOUR}/open-services`} element={<LabourOpenServices />} />
                        <Route path={`${ROUTES.LABOUR}/completed-services`} element={<LabourCompletedServices />} />
                    </Route>
                </Route>

                <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path={ROUTES.ADMIN} element={<AdminOverview />} />
                        <Route path={`${ROUTES.ADMIN}/customers`} element={<AdminCustomers />} />
                        <Route path={`${ROUTES.ADMIN}/labours`} element={<AdminLabours />} />
                        <Route path={`${ROUTES.ADMIN}/services`} element={<AdminServices />} />
                        <Route path={`${ROUTES.ADMIN}/tasks`} element={<AdminTasks />} />
                        <Route path={`${ROUTES.ADMIN}/profile`} element={<AdminProfile />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to={ROUTES.SIGNUP} replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
