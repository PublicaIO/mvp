<template>
    <nav>
        <router-link to="/dashboard" class="button button-active-action">Dashboard</router-link>
        <a href="#!" class="button button-active-action" @click.prevent="logout">Logout</a>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        logout() {
            axios.get('/logout')
                .then((resp) => {
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}
</script>

