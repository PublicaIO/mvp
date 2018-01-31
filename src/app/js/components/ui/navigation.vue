<template>
    <header class="main-header">
        <div class="main-header-content wrapper">
            <div class="header-section header-logotype">
                <img src="/images/publica.svg" class="logotype">
            </div>

            <nav class="header-section header-nav" v-if="currentUser" :class="{ opened: isOpened }">
                <div id="menu-trigger" @click.prevent="isOpened = !isOpened" :class="{ transformed: isOpened }">
                    <i>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </i>
                </div>

                <transition name="fade">
                    <ul id="main-menu" v-show="isOpened">
                        <li><router-link to="/user/dashboard">Dashboard</router-link></li>
                        <li><router-link to="/user/dashboard#submit-q">Submit question</router-link></li>
                        <li><router-link to="/user/faq">FAQ</router-link></li>
                        <li><a href="#!" @click.prevent="logout">Logout</a></li>
                    </ul>
                </transition>
            </nav>
        </div>
    </header>
</template>

<script>
import firebase from 'firebase';
import errorHandler from 'utils/errorHandler';
import Velocity from 'velocity-animate';

export default {
    data() {
        return {
            isOpened: false,
        }
    },

    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        logout() {
            firebase.auth().signOut()
                .then(() => {
                    this.$store.commit('setUser', null);
                    this.$router.push('/user/login');
                })
                .catch(errorHandler);
        }
    },

    watch:{
        $route (to, from){
            this.isOpened = false;
        }
    }
}
</script>

