import { Form, Button } from "react-bootstrap";
import ImageApi from "../api/ImageApi";
import { useEffect } from "react";
import { useSetImages } from "./ImagesContext";

type Images = Array<{ [key: string]: any }>;

const SEARCHURL = '/search/photos';
const GALLERYURL = '/photos';

const createSearchQuery = (url:string, q:string, page:number = 1, per_page:number=10) => {
    return `${url}?query=${q}&page=${page}&per_page=${per_page}`;
}

const SearchField = () => {

    const setImages = useSetImages();

	const fetchImages = async (q:string='') => {
		const url = q ? createSearchQuery(SEARCHURL,q) : GALLERYURL;
        let res:any, data:Images;

        if(q) {
            const url = createSearchQuery(SEARCHURL, q);
            res = await ImageApi.get(url);
            data = res.data.results;
        }
        else {
            res = await ImageApi.get(url);
            data = res.data;
        }

		const newData = data.map((img) => {
			return {
				id: img.id,
				url: img.urls.small,
			};
		});
		setImages(newData);
	};

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchField = e.currentTarget.elements.namedItem("search") as HTMLInputElement;
        const searchQuery = searchField.value;
        searchQuery && fetchImages(searchQuery);
    }

    useEffect(() => {
		fetchImages();
	}, []);

    return (
        <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
            <Form.Group className="d-flex gap-1">
                <Form.Control type="text" name="search" placeholder="Search" autoFocus/>
                <Button variant="success" type="submit">
                  Search
                </Button>
            </Form.Group>
        </Form>
    )
}

export default SearchField;