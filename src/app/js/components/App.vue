<script>
import Navigation from 'components/ui/navigation';
import errorHandler from 'utils/errorHandler';
import firebase from 'firebase';

export default {
    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    created() {
        const token = this.$route.query.token;

        if (token) {
            firebase.auth().signInWithCustomToken(token)
                .then((user) => {
                    const userData = {
                        displayName: user.displayName,
                        email: user.email
                    }
                    this.$store.commit('setUser', userData);
                })
                .catch(errorHandler);
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    this.$router.push('/user/login');
                } else {
                    const userData = {
                        displayName: user.displayName,
                        email: user.email
                    }
                    this.$store.commit('setUser', user.providerData.length ? user.providerData[0] : userData);
                }
            });
        }
    },

    components: {
        Navigation
    }
}
</script>
