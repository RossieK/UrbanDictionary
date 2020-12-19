import { addPartials } from "../util.js"

export async function registerPage() {
    await addPartials(this);
    this.partial('/templates/user/register.hbs');
}

export async function loginPage() {
    await addPartials(this);
    this.partial('/templates/user/login.hbs');
}