import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { getUserRole, isAuthenticated, normalizeUserRole } from '../utils/auth';

const PrivateRoute = () => {
    if (!isAuthenticated()) return <Navigate to={ROUTES.LOGIN} replace />;
    const role = normalizeUserRole(getUserRole());
    if (role === 'ROLE_ADMIN') return <Navigate to={ROUTES.ADMIN} replace />;
    if (role === 'ROLE_LABOUR') return <Navigate to={ROUTES.LABOUR} replace />;
    return <Outlet />;
};

export default PrivateRoute;
