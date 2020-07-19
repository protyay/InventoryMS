import { isEmpty } from "lodash";

export default function getFetchOptions(method, body, token = '') {
    const authToken = token.length > 0 ? `Bearer ${token}` : '';
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
