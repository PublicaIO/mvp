<template>
    <div id="page-dashboard">
        <div class="page-heading border">
            <h2 class="page-title">
                My Funds
                <p>PBL tokens: <span>{{ `${pblBalance}` | convertFromWei | formatNumber }}</span> (estimated $<span>{{ `${pblBalance}` | convertFromWei | convertToFiat | formatNumber }}</span>)</p>
            </h2>

            <p class="page-actions">
                <a href="https://publica.io" class="pull-right">How to convert PBL tokens to Bitcoin, Litecoin, Dash, Ether or fiat?</a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pblBalance: '10000000000000000000000'
        }
    },

    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>
