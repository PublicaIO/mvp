<script>
import Navigation from 'components/ui/navigation';

export default {
    props: {
        user: {
            required: false,
            default() {
                return false;
            }
        }
    },

    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        }
    },

    created() {
        this.$store.commit('setUser', this.user);
    },

    components: {
        Navigation
    }
}
</script>
