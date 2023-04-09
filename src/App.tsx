import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import CoffeeImages from "./components/Images/Images";
import SearchField from "./components/ImageSearch";
import { ImagesProvider } from "./components/ImagesContext";

const App = () => {

	return (
		<Container className="p-5">
			<ImagesProvider>
				<header>
					<h1 className="text-center">Image API</h1>
					<SearchField />
				</header>
				<CoffeeImages />
			</ImagesProvider>
		</Container>
	)
}

export default App;
