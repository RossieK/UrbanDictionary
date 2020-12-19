//globals Sammy

import { createPage, homePage, postCreate } from './controllers/catalog.js';
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
    this.post('/register', (context) => { postRegister(context); });

    this.get('/login', loginPage);
    this.post('/login', (context) => { postLogin(context); });

    this.get('/create', createPage);
    this.post('/create', (context) => { postCreate(context); });
});

app.run();