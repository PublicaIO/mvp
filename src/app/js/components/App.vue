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
                .then(this.signInCallback)
                .catch(errorHandler);
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    this.$router.push('/user/login');
                    this.$store.commit('setLoading', false);
                } else {
                    this.signInCallback(user);
                }
            });
        }
    },

    methods: {
        signInCallback(user) {
            user.getIdToken().then((token) => {
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    token,
                }

                this.$store.commit('setUser', userData);
                this.$router.push('/user/dashboard');
                this.$store.commit('setLoading', false);
            });
        }
    },

    components: {
        Navigation,
        Preloader
    }
}
</script>
