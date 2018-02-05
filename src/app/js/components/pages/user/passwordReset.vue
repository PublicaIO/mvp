<template>
    <div id="page-reset-password">
        <div class="wrapper" v-if="email">
            <h1>Reset your password</h1>
            <p class="semi-title">Set a new password for "{{ email }}" account</p>

            <p class="error" v-if="error">{{ error }}</p>

            <form @submit.prevent="resetPassword" ref="resetform">
                <p>
                    <pbl-ui-form-field :init-value="password" id="password" title="New password" type="password" @changed="password = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <pbl-ui-form-field :init-value="confirmPassword" id="confirm_password" title="Confirm new password" type="password" @changed="confirmPassword = arguments[0]">
                    </pbl-ui-form-field>
                </p>

                <p>
                    <button type="submit" class="button button-large button-active-action">Reset</button>
                </p>
            </form>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase';
import pblUiFormField from 'components/ui/formField';

export default {
    data() {
        return {
            error: null,
            oobCode: null,
            email: null,
            password: null,
            confirmPassword: null,
        }
    },

    methods: {
        resetPassword() {
            this.error = null;

            if (this.password !== this.confirmPassword) {
                this.error = 'Password mismatch';
                return;
            }

            firebase.auth().confirmPasswordReset(this.oobCode, this.password).then((resp) => {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(this.signInCallback);
            }).catch((error) => {
                this.error = error.message;
                console.error(error);
            });
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
        }
    },

    components: {
        pblUiFormField
    },

    created() {
        const { email, oobCode } = this.$route.query;
        this.email = email;
        this.oobCode = oobCode;

        if (!this.email || !this.oobCode) {
            this.$router.replace('/user/login');
        }
    }
}

</script>
