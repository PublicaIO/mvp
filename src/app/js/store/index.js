export default {
    state: {
        isLoggedIn: false,
        user: null
    },

    mutations: {
        changeState(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },

        setUser(state, user) {
            state.user = user;
        }
    }
};
