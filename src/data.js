import { getUserData, getUserId, setUserData } from './util.js';

const apiKey = 'AIzaSyApC3AP6QZDA9_GRoIIU6ZY47hkqBByazE';
const databaseUrl = 'https://urbandictionary-app-default-rtdb.firebaseio.com/';

const endpoints = {
    LOGIN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    REGISTER: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    ARTICLES: 'articles'
};

function host(url) {
    let result = databaseUrl + url + '.json';
    const auth = getUserData()

    if (auth !== null) {
        result += `?auth=${auth.idToken}`;
    }

    return result;
}

async function request(url, method, body) {
    let options = {
        method
    }

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);
    let data = await response.json();

    return data;
}

async function get(url) {
    return request(url, 'GET');
}

async function post(url, body) {
    return request(url, 'POST', body);
}

async function del(url) {
    return request(url, 'DELETE');
}

async function patch(url, body) {
    return request(url, 'PATCH', body);
}

export async function login(email, password) {
    let response = await post(endpoints.LOGIN + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    let data = await response.json();

    setUserData(data);

    return data;
}

export async function register(email, password) {
    let res = await post(endpoints.REGISTER + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    setUserData(res);

    return res;
}

export async function createArticle(article) {
    const data = Object.assign({
        _ownerId: getUserId()
    }, article);

    post(host(endpoints.ARTICLES), data);
}