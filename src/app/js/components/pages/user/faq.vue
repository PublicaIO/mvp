<template>
    <div id="page-faq">
        <ul>
            <li v-for="(item, index) in faq" :key="index">
                <p>{{ item.text }}</p>
            </li>
        </ul>
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
