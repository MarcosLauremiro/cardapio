import { BrowserRouter } from "react-router-dom";
import { RoutesMain } from "./routes/RoutesMain";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<RoutesMain />
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
