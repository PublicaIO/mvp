<template>
    <header class="main-header">
        <div class="main-header-content wrapper">
            <div class="header-section header-logotype">
                <img src="/images/publica.svg" class="logotype">
            </div>

            <nav class="header-section header-nav">
                <div class="wrapper">
                    <ul>
                        <!--
                        <li>
                            <router-link to="/user/dashboard" class="button button-active-action">Dashboard</router-link>
                        </li>

                        <li>
                            <router-link to="/book/create" class="button button-success">Create Book</router-link>
                        </li>

                        <li>
                            <router-link to="/user/profile" class="button button-active-action">Profile</router-link>
                        </li>
                        -->

                        <li>
                            <a href="#!" class="button button-passive-action" @click.prevent="logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!--
            <div class="header-section header-user">
                User
            </div>
            -->
        </div>
    </header>
</template>

<script>
import axios from 'axios';
import errorHandler from 'utils/errorHandler';

export default {
    computed: {
        isSocial() {
            return this.$store.state.isSocial;
        }
    },

    methods: {
        logout() {
            axios.get('/user/logout')
                .then((resp) => {
                    window.location.href = '/';
                })
                .catch(errorHandler);
        }
    }
}
</script>

