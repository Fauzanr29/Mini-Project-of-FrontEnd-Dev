import axios from 'axios';

// protected request --> [perlu token]

const accessToken = sessionStorage.getItem('access_token'); // sessionStorage.getItem --> tdk bagus karena bisa kena hack
// bagusnya disimpen di cookies

const request = axios.create({
    baseURL: 'http://localhost:7777',
    
    // for token
    headers: {
        'authorization': accessToken
    }
})

request.interceptors.response.use(
    (res) => res.data,
    (err) => {
        console.log(err);

        // jika token salah, akan dilempar ke logout
        if(err.response?.status === 403){
            localStorage.removeItem('access_token')
            window.location.href = '/'
        }

        throw new Error(err.message || 'Error')
    }
)

export default request;