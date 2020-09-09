import { isEmpty } from "lodash";

export default function getFetchOptions(method='', body={}, token = '') {
    // TOKEN is absolutely necessary for all API calls made.
    // To make the client code less redundant, we should try and fetch the JWT from localStorage if no TOKEN
    // is explicitly passed. If it's passed, then we USE it
    const authToken = isEmpty(token) ? `Bearer ${localStorage.getItem('jwt')}` : token;
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (!isEmpty(authToken)) {
        headers['Authorization'] = authToken;
    }
    const fetchOptions ={
        method: `${method}`,
        headers: headers
    };
    if(fetchOptions.method !== 'GET'){
        fetchOptions['body'] =JSON.stringify(body);
    }
    return fetchOptions;
};
