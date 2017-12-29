import firebase from 'firebase';

export async function isLoggedIn() {
    return await firebase.auth().currentUser;
}

export function requireAuth(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        isLoggedIn().then((user) => {
            if (!user) {
                next('/login');
            } else {
                next();
            }
        });
    } else {
        next();
    }
}
