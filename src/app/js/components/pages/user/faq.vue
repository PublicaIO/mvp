<template>
    <div id="page-faq" class="wrapper">
        <h2 class="faq-page-title">FAQ</h2>

        <div class="faq-item" v-for="(item, index) in faq" :key="index">
            <div class="question">{{ item.question }}</div>
            <div class="answer">{{ item.answer }}</div>
        </div>
    </div>
</template>

<script>

import errorHandler from 'utils/errorHandler';
import firebase from 'firebase';

export default {
    data() {
        return {
            error: false,
            faq: false
        }
    },

    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        fetchFAQ() {
            firebase.database().ref('/faq').once('value')
            .then((faq) => {
                faq = faq.val();
                this.faq = faq;
            })
            .catch((error) => {
                this.error = 'Unable to fetch items';
                console.error(error);
            });
        }

    },

    created() {
        this.fetchFAQ();
    }
}
</script>
