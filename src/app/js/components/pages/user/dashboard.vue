<template>
    <div id="page-dashboard">
        <div class="page-heading border">
            <div class="page-heading-content wrapper">
                <h2 class="page-title center">
                    Author dashboard
                </h2>
            </div>
        </div>

        <div class="dashboard-content mini-wrapper">
            <template v-if="!currentUser.email">
                <p>
                    It seems like we are missing your e-mail, please share it with us!
                </p>

                <p v-if="error">
                    {{ error }}
                </p>

                <pbl-ui-form-field :init-value="email" id="user_email" title="E-mail" type="input" @changed="email = arguments[0]">
                </pbl-ui-form-field>

                <p>
                    <button class="button button-large button-success" @click="save()">Save</button>
                </p>
            </template>

            <template v-else>
                Author Dashboard will be ready anytime soon, we will keep you up to date!
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';
import errorHandler from 'utils/errorHandler';

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
            axios.post('/user/save-email', { email: this.email })
                .then(() => this.$store.commit('setUserEmail', this.email))
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        }
    },

    components: {
        pblUiFormField
    }
}
</script>
