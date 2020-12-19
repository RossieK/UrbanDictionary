//globals Sammy

import { homePage } from './controllers/catalog.js';
import { registerPage, loginPage, postRegister, postLogin } from './controllers/user.js';
import { getUserData } from './util.js'
import * as api from './data.js';

window.api = api;

const app = Sammy('#root', function(context) {

    // Template engine setup
    this.use('Handlebars', 'hbs');

    const user = getUserData();
    this.userData = user;

    //Home routes
    this.get('/', homePage);
    this.get('/home', homePage);
    this.get('/register', registerPage);
    this.get('/login', loginPage);
    this.post('/register', (context) => { postRegister(context); });
    this.post('/login', (context) => { postLogin(context); });
});

app.run();