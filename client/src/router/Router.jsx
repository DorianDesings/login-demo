import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoutes';
const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/profile' element={<ProfilePage />} />
			</Route>
		</Routes>
	);
};

export default Router;
