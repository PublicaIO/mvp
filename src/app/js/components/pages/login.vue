<template>
    <div id="page-login">
        <div class="wrapper">
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
                    <p v-if="error" class="error">{{ error }}</p>
                    <p v-if="success" class="success">{{ success }}</p>
                </section>

                <section class="section-login" v-if="stepIsActive('login')">
                    <form @submit.prevent="login()" ref="signinform">
                        <p>
                            <pbl-ui-form-field :init-value="user_login.email" id="login_email" title="E-mail" type="input" @changed="user_login.email = arguments[0]">
                            </pbl-ui-form-field>
                        </p>

                        <p>
                            <pbl-ui-form-field :init-value="user_login.password" id="login_password" title="Password" type="password" @changed="user_login.password = arguments[0]">
                            </pbl-ui-form-field>
                        </p>

                        <p>
                            <button type="submit" class="button button-large button-success">Login</button>
                        </p>
                    </form>
                </section>

                <section class="section-register" v-if="stepIsActive('register')">
                    <form @submit.prevent="register()" ref="regform">
                        <p>
                            <pbl-ui-form-field :init-value="user_register.firstname" id="reg_firstname" title="Name" type="input" @changed="user_register.firstname = arguments[0]">
                            </pbl-ui-form-field>
                        </p>

                        <p>
                            <pbl-ui-form-field :init-value="user_register.lastname" id="reg_lastname" title="Surname" type="input" @changed="user_register.lastname = arguments[0]">
                            </pbl-ui-form-field>
                        </p>

                        <p>
                            <pbl-ui-form-field :init-value="user_register.email" id="reg_email" title="E-mail" type="email" @changed="user_register.email = arguments[0]">
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
                            <button type="submit" class="button button-large button-active-action">Register</button>
                        </p>
                    </form>
                </section>

                <section class="section-register" v-if="stepIsActive('reset')">
                    <form @submit.prevent="resetPassword()" ref="resetform">
                        <p>
                            <pbl-ui-form-field :init-value="user_reset.email" id="reset_email" title="E-mail" type="email" @changed="user_reset.email = arguments[0]">
                            </pbl-ui-form-field>
                        </p>

                        <p>
                            <button type="submit" class="button button-large button-active-action">Reset password</button>
                        </p>
                    </form>
                </section>

                <section class="login-actions">
                    <p>
                        <a href="#" @click.prevent="setStep('login')" v-if="!stepIsActive('login')">Login</a>
                        <a href="#" @click.prevent="setStep('register')" v-if="!stepIsActive('register')">Registration</a>
                        <a href="#" @click.prevent="setStep('reset')" v-if="!stepIsActive('reset')">Forgot password?</a>
                    </p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import pblUiFormField from 'components/ui/formField';
import errorHandler from 'utils/errorHandler';

export default {
    data() {
        return {
            steps: {
                reset: false,
                register: false,
                login: true
            },
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
            user_reset: {
                email: null
            },
            error: null,
            success: null
        }
    },

    methods: {
        login(fromRegistration = false) {
            const isValid = typeof this.$refs.signinform !== 'undefined' ? this.$refs.signinform.checkValidity() : true;

            if (isValid) {
                this.$store.commit('setLoading', true);
                const loginData = {
                    email: fromRegistration ? this.user_register.email : this.user_login.email,
                    password: fromRegistration ? this.user_register.password : this.user_login.password
                }

                firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
                    .then(this.signInCallback)
                    .catch((error) => {
                        this.error = error.message;
                        this.$store.commit('setLoading', false);
                    });
            }
        },

        signInCallback(user) {
            user.getIdToken().then((token) => {
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    token
                }

                this.$store.commit('setUser', userData);
                this.$router.replace('/user/dashboard');
                this.$store.commit('setLoading', false);
            })
        },

        register() {
            const isValid = this.$refs.regform.checkValidity();

            if (isValid) {
                this.$store.commit('setLoading', true);

                axios.post('/user/register', { user_register: this.user_register }).then((resp) => {
                    this.error = false;
                    this.login(true);
                }).catch((error) => {
                    this.error = error.message;
                    this.$store.commit('setLoading', false);
                });
            }
        },

        resetPassword() {
            const isValid = this.$refs.resetform.checkValidity();

            if (!isValid) {
                return;
            }

            firebase.auth().sendPasswordResetEmail(this.user_reset.email).then(() => {
                this.success = 'Email with instructions was sent to provided email address';
            }).catch((error) => {
                this.error = error.message;
                console.error(error);
            });
        },

        setStep(step) {
            this.error = null;
            this.success = null;

            Object.keys(this.steps).forEach((key) => {
                this.steps[key] = key === step;
            })
        },

        stepIsActive(step) {
            return this.steps[step];
        }
    },

    components: {
        pblUiFormField
    }
}
</script>
