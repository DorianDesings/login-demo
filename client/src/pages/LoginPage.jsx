import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
	const { isAuthenticated, loading } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated]);

	if (isAuthenticated) {
		// Si ya está autenticado, no renderiza nada y redirige al inicio
		return null;
	}

	if (loading) return <h1>Checking User...</h1>;

	return (
		<>
			<h1>Login Page</h1>;
			<form onSubmit={event => handleSubmit(event, loginData, navigate)}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						id='email'
						onChange={event =>
							setLoginData({ ...loginData, email: event.target.value })
						}
					/>
				</div>

				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={event =>
							setLoginData({ ...loginData, password: event.target.value })
						}
					/>
				</div>
				<button>LOGIN</button>
			</form>
		</>
	);
};

const handleSubmit = async (event, loginData, navigate) => {
	event.preventDefault();
	try {
		await loginRequest(loginData);
		// Después de un inicio de sesión exitoso, redirige al inicio
		navigate('/');
	} catch (error) {
		console.error('Error de inicio de sesión:', error);
		// Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error
	}
};

export default LoginPage;
