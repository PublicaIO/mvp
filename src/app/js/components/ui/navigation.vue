<template>
    <header>
        <div class="header-section header-logotype">
            <img src="/images/publica.svg" class="logotype">
        </div>

        <nav class="header-section header-nav">
            <ul>
                <li>
                    <router-link to="/user/dashboard" class="button button-active-action">Dashboard</router-link>
                </li>

                <li>
                    <router-link to="/book/create" class="button button-success">Create Book</router-link>
                </li>

                <li>
                    <a href="#!" class="button button-active-action" @click.prevent="logout">Logout</a>
                </li>
            </ul>
        </nav>

        <div class="header-section header-user">
            User
        </div>
    </header>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        logout() {
            axios.get('/user/logout')
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

