<template>
    <div id="page-dashboard">
        <div class="page-heading border">
            <div class="page-heading-content wrapper">
                <h2 class="page-title center">
                    Author's Dashboard
                </h2>
            </div>
        </div>

        <div class="dashboard-content" v-if="currentUser">
            <template v-if="!currentUser.email">
                <form @submit.prevent="save" ref="emailform" class="mini-wrapper">
                    <p>
                        It seems like we are missing your e-mail, please share it with us!
                    </p>

                    <p v-if="error">
                        {{ error }}
                    </p>

                    <pbl-ui-form-field :init-value="email" id="user_email" title="E-mail" type="input" @changed="email = arguments[0]">
                    </pbl-ui-form-field>

                    <p>
                        <button class="button button-large button-success" type="submit">Save</button>
                    </p>
                </form>
            </template>

            <template v-else>
                <div class="wrapper">
                    <p class="welcome-msg">Listen to Publica guidance podcast by our CEO, Josef Marc</p>

                    <p v-if="error">{{ error }}</p>

                    <ul class="accordion">
                        <li v-for="(podcast, index) in podcasts" @click="podcast.expanded = !podcast.expanded" :key="index">
                            <i></i>
                            <p>{{ podcast.title }}</p>

                            <transition name="expand" v-on:enter="togglePodcastEnter" v-on:leave="togglePodcastLeave" v-on:leave-cancelled="leaveCancelled" v-on:enter-cancelled="enterCancelled">
                                <div class="item-content" v-show="podcast.expanded">
                                    <audio ref="player" controls controlsList="nodownload">
                                        <source v-bind:src="podcast.url">
                                        Your browser does not support the audio element.
                                    </audio>
                                    <div class="actions">
                                        <a href="#!">Download MP3</a>
                                        <a href="#!">Show transcript</a>
                                    </div>
                                </div>
                            </transition>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';
import errorHandler from 'utils/errorHandler';
import firebase from 'firebase';
import Velocity from 'velocity-animate';

export default {
    data() {
        return {
            error: false,
            email: null,
            podcasts: [],
            animated: null,
        }
    },

    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },

    methods: {
        save() {
            const isValid = this.$refs.emailform.checkValidity();

            if (isValid) {
                const user = firebase.auth().currentUser;

                user.updateEmail(this.email)
                    .then(() => this.$store.commit('setUserEmail', this.email))
                    .catch((error) => {
                        this.error = error.message;
                    });
            }
        },

        fetchPodcasts() {
            firebase.database().ref('/podcasts').once('value')
            .then((podcasts) => {
                podcasts = podcasts.val();

                for (let podcast in podcasts) {
                    podcasts[podcast].expanded = false;
                }

                this.podcasts = podcasts;
            })
            .catch((error) => {
                this.error = 'Unable to fetch podcasts';
                console.error(error);
            });
        },

        enterCancelled(element) {
            Velocity(element, 'stop');
            this.togglePodcastLeave(element, () => {});
        },

        leaveCancelled(element) {
            Velocity(element, 'stop');
            this.togglePodcastEnter(element, () => {});
        },

        togglePodcastEnter(element, done) {
            const height = element.offsetHeight + 'px';
            const opacity = 1;
            const translateY = '0'

            element.style.position = 'relative';
            element.style.height = 0;

            Velocity(element, { height, opacity, translateY }, { complete: done });
        },

        togglePodcastLeave(element, done) {
            const height = 0;
            const translateY = '50%';
            const opacity = 0;

            Velocity(element, { height, translateY, opacity }, {
                complete: () => {
                    element.style.height = '';
                    done();
                }
            });
        }
    },

    components: {
        pblUiFormField
    },

    created() {
        this.fetchPodcasts();
    }
}
</script>
