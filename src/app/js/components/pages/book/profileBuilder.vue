<template>
    <div id="profile-builder">
        Hello world
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

