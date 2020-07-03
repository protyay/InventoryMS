import { isEmpty } from "lodash";

export default function getFetchOptions(method, body, token = '') {
    const authToken = token.length > 0 ? `Bearer ${token}` : '';
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (!isEmpty(authToken)) {
        headers['Authorization'] = authToken;
    }
    return {
        method: `${method}`,
        headers: headers,
        body: JSON.stringify(body)
    }
};
