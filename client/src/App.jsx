import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/Auth.provider';
import Router from './router/Router';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<AuthProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
};

export default App;
