<template>
    <div id="profile-builder">
        Hello world
    </div>
</template>

<script>
import axios from 'axios';

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
        }).catch((error) => {
            console.log(error);
        });
    }
}
</script>

