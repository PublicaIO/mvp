import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import routes from 'routes';
import Store from 'store';
import App from 'components/App';
import filters from 'filters';
import errorHandler from 'utils/errorHandler';

require('../scss/style');

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ routes });
const store = new Vuex.Store(Store);

filters.forEach((filter) => {
    Vue.filter(filter.title, filter.filter);
});

new Vue({
    router,
    store,
    components: {
        App
    },
    methods: {
        logoutAction() {
            axios.get('/user/logout')
                .then((resp) => {
                    window.location.href = '/';
                })
                .catch(errorHandler);
        },

        logout() {
            if (this.isSocial) {
                FB.logout(resp => this.logoutAction());
            } else {
                this.logoutAction();
            }
        }
    },
    mounted() {
        if (this.isSocial) {
            FB.init({
                appId: '174059883202740',
                status: true,
                xfbml: true,
                version: 'v2.6'
            });
        }
    }
}).$mount('#app');
