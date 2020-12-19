import { addPartials } from '../util.js';
import { createArticle, getAll } from '../data.js';

export async function homePage() {
    await addPartials(this);

    const data = { "articles": await getAll() };

    const context = data;
    context.user = this.app.userData;

    this.partial('/templates/catalog/home.hbs', context);
}

export async function createPage() {
    await addPartials(this);

    const context = {
        user: this.app.userData
    };

    this.partial('/templates/catalog/createArticle.hbs', context);
}

export async function postCreate(context) {
    const { title, category, content } = context.params;

    try {
        if (title.length == 0 || category.length == 0 || content.length == 0) {
            throw new Error('All fields are required!');
        } else {
            await createArticle({
                title,
                category,
                content
            });
            context.redirect('/home');
        }
    } catch (err) {
        console.error(err);
    }
}