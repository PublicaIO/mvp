<template>
    <div class="preloader" v-if="isLoading">
        <div class="preloader-wrapper">
            <img src="/images/preloader.svg" alt="Loading...">
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        }
    }
}
</script>
