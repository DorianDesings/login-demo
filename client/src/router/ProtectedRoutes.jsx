import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading) return <h1>Loading...</h1>;
	if (!isAuthenticated && !loading) return <Navigate to='/login' replace />;
	return <Outlet />;
};

export default ProtectedRoute;
