import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from 'routes';
import Store from 'store';
import App from 'components/App';
import filters from 'filters';

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
    }
}).$mount('#app');
