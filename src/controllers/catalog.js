import { addPartials } from '../util.js';
import { getAll } from '../data.js';

export async function homePage() {
    await addPartials(this);
    this.partials.article = this.load('/templates/catalog/article.hbs');

    const context = {
        articles: await getAll()
    };

    this.partial('/templates/catalog/home.hbs', context);
}