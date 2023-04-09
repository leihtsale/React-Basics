import Axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export default Axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Authorization': `Client-ID ${apiKey}`,
        'Accept-Version': 'v1',
    }
})