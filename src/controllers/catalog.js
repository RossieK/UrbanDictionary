import { addPartials } from '../util.js';
import { getAll } from '../data.js';

export async function homePage() {
    await addPartials(this);

    const data = { "articles": await getAll() };

    const context = data;

    this.partial('/templates/catalog/home.hbs', context);
}