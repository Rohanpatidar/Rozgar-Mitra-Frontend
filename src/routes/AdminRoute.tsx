import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { isAuthenticated, getUserRole, normalizeUserRole } from '../utils/auth';

const AdminRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (normalizeUserRole(getUserRole()) !== 'ROLE_ADMIN') {
        return <Navigate to={ROUTES.HOME} replace />;
    }
    return <Outlet />;
};

export default AdminRoute;