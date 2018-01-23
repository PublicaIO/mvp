<template>
    <div id="page-dashboard">
        <div class="page-heading border">
            <div class="page-heading-content wrapper">
                <h2 class="page-title center">
                    Author's Dashboard
                </h2>
            </div>
        </div>

        <div class="dashboard-content" v-if="currentUser">
            <template v-if="!currentUser.email">
                <form @submit.prevent="save" ref="emailform" class="mini-wrapper">
                    <p>
                        It seems like we are missing your e-mail, please share it with us!
                    </p>

                    <p v-if="error">
                        {{ error }}
                    </p>

                    <pbl-ui-form-field :init-value="email" id="user_email" title="E-mail" type="input" @changed="email = arguments[0]">
                    </pbl-ui-form-field>

                    <p>
                        <button class="button button-large button-success" type="submit">Save</button>
                    </p>
                </form>
            </template>

            <template v-else>
                <div class="wrapper">
                    <p>
                        Welcome! Thank you for registration! Here you will soon see guidance videos on how to use the Publica platform. Stay tuned for updates!
                    </p>

                    <iframe src="https://www.youtube.com/embed/zSUY_8MEikA" class="dashboard-video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';
import errorHandler from 'utils/errorHandler';
import firebase from 'firebase';

export default {
    data() {
        return {
            error: false,
            email: null
        }
    },

    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        save() {
            const isValid = this.$refs.emailform.checkValidity();

            if (isValid) {
                const user = firebase.auth().currentUser;

                user.updateEmail(this.email)
                    .then(() => this.$store.commit('setUserEmail', this.email))
                    .catch((error) => {
                        this.error = error.message;
                    });
            }
        }
    },

    components: {
        pblUiFormField
    }
}
</script>
