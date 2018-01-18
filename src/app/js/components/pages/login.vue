<template>
    <div id="page-login">
        <h1>Sign in to Publica</h1>
        <template v-if="error">
            <p>
                {{ error }}
            </p>
        </template>

        <fb:login-button onlogin="checkLoginState" data-auto-logout-link="false" data-button-type="continue_with" scope="public_profile,email" size="medium" v-pre></fb:login-button>
        <script type="in/Login" v-pre></script>

        <div class="login-auth">
            <section class="section-login">
                <p>
                    <pbl-ui-form-field info="test" :init-value="user_login.email" id="login_email" title="E-mail" type="input" @changed="user_login.email = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <pbl-ui-form-field :init-value="user_login.password" id="login_password" title="Password" type="password" @changed="user_login.password = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <button class="button button-large button-success" @click="login()">Login</button>
                </p>
            </section>

            <section class="section-register">
                <p>
                    <pbl-ui-form-field :init-value="user_register.firstname" id="reg_firstname" title="Name" type="input" @changed="user_register.firstname = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <pbl-ui-form-field :init-value="user_register.lastname" id="reg_lastname" title="Surname" type="input" @changed="user_register.lastname = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <pbl-ui-form-field :init-value="user_register.email" id="reg_email" title="E-mail" type="input" @changed="user_register.email = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <pbl-ui-form-field :init-value="user_register.password" id="reg_password" title="Password" type="password" @changed="user_register.password = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <pbl-ui-form-field :init-value="user_register.confirm_password" id="reg_confirm_password" title="Repeat Password" type="password" @changed="user_register.confirm_password = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <button class="button button-large button-active-action" @click="register">Register</button>
                </p>
            </section>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';

export default {
    data() {
        return {
            user_login: {
                email: 'thisis@example.com',
                password: 'example'
            },
            user_register: {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                confirm_password: null
            },
            error: false
        }
    },

    methods: {
        checkLD() {
            console.log('asdf');
            IN.User.authorize(() => console.log);
        },

        checkLoginState(event) {
            if (event.status === 'connected') {
                axios.post('/user/loginsocial', { auth: event.authResponse })
                    .then((resp) => {
                        this.error = false;
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        this.error = error.response.data.message;
                    });
            }
        },

        login(fromRegistration = false) {
            const loginData = {
                email: fromRegistration ? this.user_register.email : this.user_login.email,
                password: fromRegistration ? this.user_register.password : this.user_login.password
            }

            axios.post('/user/login', loginData).then((resp) => {
                this.error = false;
                window.location.href = '/';
            }).catch((error) => {
                this.error = error.response.data.message;
            });
        },

        register() {
            axios.post('/user/register', { user_register: this.user_register }).then((resp) => {
                this.error = false;
                this.login(true);
            }).catch((error) => {
                console.error(error.response);
                this.error = error.response.data.message;
            });
        }
    },

    created() {
        window.checkLoginState = this.checkLoginState;
    },

    components: {
        pblUiFormField
    }
}
</script>
