import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { isAuthenticated, getUserRole, normalizeUserRole } from '../utils/auth';

const LabourRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (normalizeUserRole(getUserRole()) !== 'ROLE_LABOUR') {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
};

export default LabourRoute;