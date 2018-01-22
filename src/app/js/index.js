import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import routes from 'routes';
import Store from 'store';
import firebase from 'firebase';
import App from 'components/App';
import filters from 'filters';
import errorHandler from 'utils/errorHandler';

const config = {
    apiKey: 'AIzaSyDMVH7YklsngH7XcIuJK7Ssw1t8-2_zcUU',
    authDomain: 'test-113fe.firebaseapp.com',
    databaseURL: 'https://test-113fe.firebaseio.com',
    projectId: 'test-113fe',
    storageBucket: 'test-113fe.appspot.com',
    messagingSenderId: '333700728393'
};
firebase.initializeApp(config);


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
