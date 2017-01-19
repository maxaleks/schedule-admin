
import axios from 'axios';
import $ from 'jquery';

// function getHeaders() {
//     return {
//         'X-Auth-Token': localStorage.getItem('token'),
//         //'content-type': 'application/x-www-form-urlencoded',
//     };
// }


/*let _invalidToken = null;
function onInvalidToken(foo) {
    _invalidToken = foo;
}*/

function request(url, data, method) {
    return $.ajax({
        method,
        url,
        data: { ...data, token: localStorage.getItem('token'), },
        //headers: getHeaders(),
    });
}

axios.interceptors.response.use(
    (response) => response.data,
    (error) => {}
);

function get(url) {
    return request(url, null, 'GET');
}

function post(url, data) {
    return request(url, data, 'POST');
}

function patch(url, data) {
    return request(url, data, 'PATCH');
}

function del(url) {
    return request(url, null, 'DELETE');
}

function put(url, data) {
    return request(url, data, 'PUT');
}



export default {
    //onInvalidToken,
    get,
    post,
    patch,
    del,
    put,
};
