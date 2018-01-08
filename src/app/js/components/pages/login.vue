<template>
    <div id="page-login">
        <template v-if="error">
            <p>
                {{ error }}
            </p>
        </template>
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
            password: 'example',
            error: false
        }
    },

    methods: {
        login() {
            axios.post('/login', {
                email: this.email,
                password: this.password
            }).then((resp) => {
                this.error = false;
                window.location.href = '/';
            }).catch((error) => {
                this.error = error.response.data.message;
            });
        },

        register() {
            axios.post('/register', {
                email: this.email,
                password: this.password
            }).then((resp) => {
                this.error = false;
                this.login();
            }).catch((error) => {
                console.log(error);
                this.error = error.response.data.message;
            });
        }
    }
}
</script>

