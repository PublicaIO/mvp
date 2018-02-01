<script>
import Navigation from 'components/ui/navigation';
import Preloader from 'components/ui/preloader';
import errorHandler from 'utils/errorHandler';
import firebase from 'firebase';

export default {
    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    created() {
        const { token } = this.$route.query;

        if (token) {
            firebase.auth().signInWithCustomToken(token)
                .then(async (user) => {
                    const userData = {
                        displayName: user.displayName,
                        email: user.email,
                        token: await user.getIdToken()
                    }
                    this.$store.commit('setUser', userData);
                    this.$router.push('/user/dashboard');
                    this.$store.commit('setLoading', false);
                })
                .catch(errorHandler);
        } else {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (!user) {
                    this.$router.push('/user/login');
                    this.$store.commit('setLoading', false);
                } else {
                    const userData = {
                        displayName: user.displayName,
                        email: user.email,
                        token: await user.getIdToken()
                    }
                    this.$store.commit('setUser', userData);
                    this.$store.commit('setLoading', false);
                }
            });
        }
    },

    components: {
        Navigation,
        Preloader
    }
}
</script>
