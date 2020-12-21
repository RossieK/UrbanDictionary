import { addPartials, getUserId, errorNotify, successNotify } from '../util.js';
import { createArticle, getById, editArticle, deleteById, getMy, getOther } from '../data.js';

export async function homePage() {
    await addPartials(this);

    const data = { "myArticles": await getMy(), "otherArticles": await getOther() };

    const context = data;
    context.user = this.app.userData;

    this.partial('/templates/catalog/home.hbs', context);
}

export async function detailsPage() {
    await addPartials(this);

    const article = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        article,
        canEdit: article._ownerId == getUserId()
    }

    this.partial('/templates/catalog/detailsArticle.hbs', context);
}

export async function createPage() {
    await addPartials(this);

    const context = {
        user: this.app.userData
    };

    this.partial('/templates/catalog/createArticle.hbs', context);
}

export async function postCreate(context) {
    const { word, description } = context.params;

    try {
        if (word.length == 0 || description.length == 0) {
            errorNotify('All fields are required!');
        } else {
            await createArticle({
                word,
                description
            });
            successNotify('Word successfully added!', context, '/home');
        }
    } catch (err) {
        console.error(err);
    }
}

export async function editPage() {
    await addPartials(this);

    const article = await getById(this.params.id);

    if (article._ownerId !== getUserId()) {
        this.redirect('/home');
    } else {

        const context = {
            user: this.app.userData,
            article
        }

        this.partial('/templates/catalog/editArticle.hbs', context);
    }
}

export async function postEdit(context) {
    const { title, category, content } = context.params;

    try {
        if (title.length == 0 || category.length == 0 || content.length == 0) {
            throw new Error('All fields are required!');
        } else {
            await editArticle(context.params.id, {
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

export async function deleteArticle() {
    try {
        const id = this.params.id;
        await deleteById(id);
        this.redirect('/home')
    } catch (err) {
        console.error(err);
    }
}