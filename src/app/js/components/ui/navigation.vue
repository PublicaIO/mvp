<template>
    <nav>
        <router-link to="/dashboard" class="button button-active-action">Dashboard</router-link>
        <a href="#!" class="button button-active-action" @click.prevent="logout">Logout</a>
    </nav>
</template>

<script>
import firebase from 'firebase';

export default {
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                console.log('logout?');
                this.$router.push('/');
            });
        }
    }
}
</script>

