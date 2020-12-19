//globals Sammy

import { homePage } from './controllers/catalog.js';
import { registerPage, loginPage, postRegister } from './controllers/user.js';
import * as api from './data.js';

window.api = api;

const app = Sammy('#root', function(context) {

    // Template engine setup
    this.use('Handlebars', 'hbs');

    /*
    const user = getUserData();
    this.userData = {
        isLoggedIn: user? true:false,
        ...user
    };
    console.log(this.userData);
    */

    //Home routes
    this.get('/', homePage);
    this.get('/home', homePage);
    this.get('/register', registerPage);
    this.get('/login', loginPage);
    this.post('/register', (context) => { postRegister(context); });
});

app.run();