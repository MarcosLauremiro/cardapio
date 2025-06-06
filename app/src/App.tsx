import { BrowserRouter } from "react-router-dom";
import { RoutesMain } from "./routes/RoutesMain";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<RoutesMain />
					<Toaster />
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
