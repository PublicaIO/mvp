import Vue from 'vue';
import Login from 'components/pages/login';

require('../scss/style');

new Vue({
    components: {
        Login
    },

    mounted() {
        FB.init({
            appId: '174059883202740',
            status: true,
            xfbml: true,
            version: 'v2.6'
        });
    }
}).$mount('#app');
