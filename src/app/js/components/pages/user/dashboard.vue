<template>
    <div id="page-dashboard">
        <div class="page-heading border">
            <div class="page-heading-content wrapper">
                <h2 class="page-title">
                    My Funds
                    <p>PBL tokens: <span>{{ `${pblBalance}` | convertFromWei | formatNumber }}</span> (estimated $<span>{{ `${pblBalance}` | convertFromWei | convertToFiat | formatNumber }}</span>)</p>
                </h2>

                <p class="page-actions">
                    <a href="https://publica.io" class="pull-right">How to convert PBL tokens to Bitcoin, Litecoin, Dash, Ether or fiat?</a>
                </p>
            </div>
        </div>

        <div class="books-list">
            <p class="book-block" v-for="book in books" :key="book.id">
                <router-link :to="`/book/${book.id}/build`">{{ book.book.title }}</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import errorHandler from 'utils/errorHandler';

export default {
    data() {
        return {
            books: [],
            pblBalance: '10000000000000000000000'
        }
    },

    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        getBooks() {
            axios.get('/user/books')
                .then((resp) => {
                    this.books = resp.data.books;
                }).catch(errorHandler);
        }
    },

    mounted() {
        // this.getBooks();
    }
}
</script>
