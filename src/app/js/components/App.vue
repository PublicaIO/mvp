<script>
import Navigation from 'components/ui/navigation';

export default {
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        }
    },

    components: {
        Navigation
    }
}
</script>
