<template>
    <div id="profile-builder">
        <div class="page-heading center">
            <h2 class="page-title">
                Build profile page for your book
            </h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import errorHandler from 'utils/errorHandler';

export default {
    data() {
        return {
            test: true
        }
    },

    mounted() {
        const bookID = this.$route.params.id;

        axios.get(`/book/${bookID}`).then((resp) => {
            console.log(resp.data);
        }).catch(errorHandler);
    }
}
</script>

