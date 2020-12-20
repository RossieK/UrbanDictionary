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

export function errorNotify(message) {
    document.getElementById("errorSection").style.display = "block";
    document.getElementById("errorBox").textContent = message;

    setTimeout(function() {
        document.getElementById("errorSection").style.display = "none";
        document.getElementById("errorBox").textContent = "";
    }, 3000);
}

export function successNotify(message, context, route) {
    document.getElementById("successSection").style.display = "block";
    document.getElementById("successBox").textContent = message;

    setTimeout(function() {
        document.getElementById("successSection").style.display = "none";
        document.getElementById("successBox").textContent = "";
        context.redirect(route);
    }, 3000);
}