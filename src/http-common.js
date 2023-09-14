import axios from 'axios';
import router from './router';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        "Content-type": "application/json"
    }
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            router.push('/home');
        }
        return Promise.reject(error);
    }
);

export default instance;


// import axios from "axios";

// export default axios.create({
//     baseURL: "http://localhost:8000/api",
//     headers: {
//         "Content-type": "application/json"
//     }
// });