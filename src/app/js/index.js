import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from 'routes';
import Store from 'store';
import App from 'components/App';
import { requireAuth } from 'helpers/auth';
import firebase from 'firebase';
import filters from 'filters';

const firebaseConfig = {
    apiKey: 'AIzaSyDMVH7YklsngH7XcIuJK7Ssw1t8-2_zcUU',
    authDomain: 'test-113fe.firebaseapp.com',
    databaseURL: 'https://test-113fe.firebaseio.com',
    projectId: 'test-113fe',
    storageBucket: 'test-113fe.appspot.com',
    messagingSenderId: '333700728393'
};

firebase.initializeApp(firebaseConfig);

require('../scss/style');

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ routes });
const store = new Vuex.Store(Store);

filters.forEach((filter) => {
    Vue.filter(filter.title, filter.filter);
});

router.beforeEach(requireAuth);

new Vue({
    router,
    store,
    components: {
        App
    },

    methods: {
        changeAuthState(user) {
            this.$store.commit('changeState', Boolean(user));

            if (user) {
                this.$store.commit('setUser', user);
                this.$router.push('/');
            } else {
                this.$store.commit('setUser', null);
                this.$router.push('/login');
            }
        }
    },

    mounted() {
        firebase.auth().onAuthStateChanged(this.changeAuthState);
    }
}).$mount('#app');
