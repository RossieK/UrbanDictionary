//globals Sammy

// import { homePage } from './src/catalog.js';
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
});

app.run();