import { login, register } from "../data.js";
import { addPartials } from "../util.js"

export async function registerPage() {
    await addPartials(this);
    this.partial('/templates/user/register.hbs');
}

export async function loginPage() {
    await addPartials(this);
    this.partial('/templates/user/login.hbs');
}

export async function postRegister(context) {
    const { email, password, rePass } = context.params;

    try {
        if (email.length == 0 || password.length == 0) {
            throw new Error('All fields are required!');
        } else if (password !== rePass) {
            throw new Error('Passwords don\'t match!');
        } else {
            const result = await register(email, password);
            context.app.userData = result;
            context.redirect('/home');
        }
    } catch (err) {
        console.error(err);
    }
}

export async function postLogin(context) {
    const { email, password } = context.params;

    try {
        if (email.length == 0 || password.length == 0) {
            throw new Error('All fields are required!');
        } else {
            const result = await login(email, password);
            context.app.userData = result;
            context.redirect('/home');
        }
    } catch (err) {
        console.error(err);
    }
}