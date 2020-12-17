export function setUserData(data) {
    sessionStorage.setItem('auth', JSON.stringify(data));
}

export function getUserData() {
    const auth = sessionStorage.getItem('auth');

    if (auth !== null) {
        return JSON.parse(auth);
    } else {
        return null;
    }
}

export function getUserId() {
    const auth = sessionStorage.getItem('auth');

    if (auth !== null) {
        return JSON.parse(auth).localId;
    } else {
        return null;
    }
}

export function objectToArray(data) {
    if (data === null) {
        return [];
    } else {
        return Object.entries(data).map(([key, value]) => Object.assign({ _id: key }, value));
    }
}

export async function addPartials(context) {
    const partials = await Promise.all([
        context.load('templates/common/header.hbs'),
        context.load('templates/common/footer.hbs')
    ]);
    context.partials = {
        header: partials[0],
        footer: partials[1]
    }
}