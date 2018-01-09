<template>
    <div id="page-profile">
        <div class="page-heading center">
            <h2 class="page-title">
                Welcome, {{ user.displayName ? user.displayName : user.email }}!
            </h2>
        </div>

        <div class="content">
            <div class="form-item">
                <pbl-ui-form-field :init-value="user.displayName" id="display-name" title="Your name" type="input" @changed="user.displayName = arguments[0]">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="user.email" id="email" title="Your email" type="input" @changed="user.email = arguments[0]">
                </pbl-ui-form-field>
            </div>

            <div class="form-item form-actions">
                <button class="button button-large button-active-action" @click.prevent="saveProfile">Save</button>
            </div>
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
            user: {
                displayName: null,
                email: null
            }
        }
    },

    methods: {
        saveProfile() {
            axios.post('/user/profile/save', this.user).catch(errorHandler);
        }
    },

    mounted() {
        axios.get('/user/profile').then((resp) => {
            this.user = resp.data;
        }).catch(errorHandler);
    },

    components: {
        pblUiFormField
    }
}
</script>
