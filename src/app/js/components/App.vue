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
        const { token, mode, oobCode } = this.$route.query;

        if (token) {
            firebase.auth().signInWithCustomToken(token)
                .then(this.signInCallback)
                .catch(errorHandler);
        } else if (mode && oobCode && mode === 'resetPassword') {
            this.resetPasswordHandler(oobCode);
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    this.sendUserToLoginScreen();
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
                this.$router.replace('/user/dashboard');
                this.$store.commit('setLoading', false);
            });
        },

        resetPasswordHandler(oobCode) {
            firebase.auth().verifyPasswordResetCode(oobCode)
                .then((email) => {
                    this.$router.replace({ path: '/user/password-reset', query: Object.assign(this.$route.query, { email }) });
                    this.$store.commit('setLoading', false);
                })
                .catch(this.sendUserToLoginScreen);
        },

        sendUserToLoginScreen() {
            this.$router.replace('/user/login');
            this.$store.commit('setLoading', false);
        }
    },

    components: {
        Navigation,
        Preloader
    }
}
</script>
