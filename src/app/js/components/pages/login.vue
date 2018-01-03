<template>
    <div id="page-login">
        <p>
            <input type="text" v-model="email" placeholder="Email">
        </p>

        <p>
            <input type="password" v-model="password" placeholder="Password">
        </p>

        <p>
            <button @click="login">Login</button>
            <button @click="register">Register</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: 'thisis@example.com',
            password: 'example'
        }
    },

    methods: {
        login() {
            axios.post('/login', {
                email: this.email,
                password: this.password
            }).then((resp) => {
                window.location.href = '/';
            }).catch((error) => {
                console.log(error);
            });
        },

        register() {
            axios.post('/register', {
                email: this.email,
                password: this.password
            }).then((resp) => {
                this.login();
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

