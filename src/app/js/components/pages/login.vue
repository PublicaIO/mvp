<template>
    <div id="page-login">
        <h1>Sign in to Publica</h1>

        <p>
            <a class="social-button button-facebook" href="/user/auth/facebook">
                <img src="/images/facebook.svg" alt="Facebook">
                <span>Continue with Facebook</span>
            </a>
        </p>

        <p>
            <a class="social-button button-linkedin" href="/user/auth/linkedin">
                <img src="/images/linkedin.svg" alt="LinkedIn">
                <span>Continue with LinkedIn</span>
            </a>
        </p>

        <p>
            <a class="social-button button-goodreads" href="/user/auth/goodreads">
                <img src="/images/goodreads.svg" alt="GoodReads">
                <span>Continue with GoodReads</span>
            </a>
        </p>

        <p class="separate">
            <span>or</span>
        </p>

        <div class="login-auth">
            <section>
                <template v-if="error">
                    <p>
                        {{ error }}
                    </p>
                </template>
            </section>

            <section class="section-login" v-if="!registerStep">
                <p>
                    <pbl-ui-form-field :init-value="user_login.email" id="login_email" title="E-mail" type="input" @changed="user_login.email = arguments[0]">
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

            <section class="section-register" v-if="registerStep">
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

            <section class="login-actions">
                <p>
                    <a href="#" @click.prevent="registerStep = true" v-if="!registerStep">Registration</a>
                    <a href="#" @click.prevent="registerStep = false" v-if="registerStep">Login</a>
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
            registerStep: false,
            user_login: {
                email: null,
                password: null
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

    components: {
        pblUiFormField
    }
}
</script>
