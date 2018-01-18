<script>
import Navigation from 'components/ui/navigation';

export default {
    props: {
        user: {
            required: false,
            default() {
                return false;
            }
        },
        isSocial: {
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
        this.$store.commit('setSocial', this.isSocial);
    },

    components: {
        Navigation
    }
}
</script>
