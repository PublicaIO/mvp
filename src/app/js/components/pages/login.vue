<template>
    <div id="page-login">
        <template v-if="error">
            <p>
                {{ error }}
            </p>
        </template>

        <p>
            <pbl-ui-form-field :init-value="email" id="email" title="Your Email" type="input" @changed="email = arguments[0]">
            </pbl-ui-form-field>
        </p>

        <p>
            <pbl-ui-form-field :init-value="password" id="password" title="Your Password" type="password" @changed="password = arguments[0]">
            </pbl-ui-form-field>
        </p>

        <p>
            <button class="button button-large button-success" @click="login">Login</button>
            <button class="button button-large button-active-action" @click="register">Register</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';

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
            axios.post('/user/login', {
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
            axios.post('/user/register', {
                email: this.email,
                password: this.password
            }).then((resp) => {
                this.error = false;
                this.login();
            }).catch((error) => {
                console.error(error);
                this.error = error.response.data.message;
            });
        }
    },

    components: {
        pblUiFormField
    }
}
</script>

