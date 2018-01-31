<template>
    <div id="page-faq" class="wrapper">
        <h2 class="faq-page-title">FAQ</h2>

        <div class="faq-item" v-for="(item, index) in faqs" :key="index">
            <div class="question">{{ item.question }}</div>
            <div class="answer">{{ item.answer }}</div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import errorHandler from 'utils/errorHandler';

export default {
    data() {
        return {
            error: false,
            faqs: false,
            isLoading: false
        }
    },

    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        fetchFAQ() {
            this.isLoading = true;

            axios.get('/faq/get')
            .then((response) => {
                this.faqs = response.data.faqs;
                this.isLoading = false;
            })
            .catch((error) => {
                this.isLoading = false;
                errorHandler(error);
            })
        }

    },

    created() {
        this.fetchFAQ();
    }
}
</script>
