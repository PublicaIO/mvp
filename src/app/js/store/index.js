export default {
    state: {
        isLoggedIn: false
    },

    mutations: {
        changeState(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        }
    }
};
