import { BrowserRouter } from "react-router-dom";
import { RoutesMain } from "./routes/RoutesMain";

function App() {
	return (
		<>
			<BrowserRouter>
				<RoutesMain />
			</BrowserRouter>
		</>
	);
}

export default App;
