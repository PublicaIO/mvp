import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from 'routes';
import Store from 'store';
import App from 'components/App';
import { requireAuth } from 'helpers/auth';
import firebase from 'firebase';

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

router.beforeEach(requireAuth);

new Vue({
    router,
    store,
    components: {
        App
    },

    methods: {
        changeAuthState(user) {
            this.$store.commit('changeState', !!user);
        },

        // createUser() {
        //     firebase.auth().createUserWithEmailAndPassword('example-user@example.com', 'example-password').catch(console.log);
        // }
    },

    mounted() {
        firebase.auth().onAuthStateChanged(this.changeAuthState);
    }
}).$mount('#app');
