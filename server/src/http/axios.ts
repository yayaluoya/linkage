import axios from 'axios';

const _axios = axios.create({
    baseURL: '',
    timeout: 6000,
});

// Add a request interceptor
_axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //设置暗号
    return Promise.resolve(config);
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
_axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('响应', response);
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

/** */
export default _axios;