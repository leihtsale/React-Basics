import './images.css';
import { useImages } from '../ImagesContext';

const CoffeeImages = () => {
	const images = useImages();

	return (
		<div className="container">
			{images.map((img) => {
				return (
					<div key={img.id} className="coffee-container">
						<img src={img.url} alt="coffee" />
					</div>
				);
			})}
		</div>
	);
};

export default CoffeeImages;
