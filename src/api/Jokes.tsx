import Axios from 'axios';

export default Axios.create({
    baseURL: 'https://official-joke-api.appspot.com',
    headers: {}
});