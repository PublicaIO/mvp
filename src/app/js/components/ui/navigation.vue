<template>
    <header class="main-header">
        <div class="main-header-content wrapper">
            <div class="header-section header-logotype">
                <img src="/images/publica.svg" class="logotype">
            </div>

            <nav class="header-section header-nav" v-if="currentUser">
                <ul>
                    <li><router-link to="/user/dashboard">Dashboard</router-link></li>
                    <li><router-link to="/user/dashboard">Submit question</router-link></li>
                    <li><router-link to="/user/faq">FAQ</router-link></li>
                    <li><a href="#!" @click.prevent="logout">Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import firebase from 'firebase';
import errorHandler from 'utils/errorHandler';

export default {
    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        logout() {
            firebase.auth().signOut()
                .then(() => {
                    this.$store.commit('setUser', null);
                    this.$router.push('/user/login');
                })
                .catch(errorHandler);
        }
    }
}
</script>

