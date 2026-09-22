import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { getUserRole, isAuthenticated, normalizeUserRole } from '../utils/auth';

const PublicRoute = () => {
    if (!isAuthenticated()) return <Outlet />;
    const role = normalizeUserRole(getUserRole());
    if (role === 'ROLE_ADMIN') return <Navigate to={ROUTES.ADMIN} replace />;
    if (role === 'ROLE_LABOUR') return <Navigate to={ROUTES.LABOUR} replace />;
    return <Navigate to={ROUTES.HOME} replace />;
};

export default PublicRoute;
