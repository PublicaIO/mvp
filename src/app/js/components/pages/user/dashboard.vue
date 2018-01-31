<template>
    <div id="page-dashboard">
        <div class="dashboard-content" v-if="currentUser">
            <template v-if="!currentUser.email">
                <form @submit.prevent="save" ref="emailform" class="mini-wrapper">
                    <p>
                        It seems like we are missing your e-mail, please share it with us!
                    </p>

                    <p v-if="error">{{ error }}</p>

                    <pbl-ui-form-field :init-value="email" id="user_email" title="E-mail" type="input" @changed="email = arguments[0]">
                    </pbl-ui-form-field>

                    <p>
                        <button class="button button-large button-success" type="submit">Save</button>
                    </p>
                </form>
            </template>

            <template v-else>
                <div class="wrapper">
                    <div class="podcasts-wrapper">
                        <h2>Listen to Publica guidance podcast by our CEO, Josef Marc</h2>
                        <p v-if="error">{{ error }}</p>

                        <ul class="accordion podcasts">
                            <li v-for="(podcast, index) in podcasts" :key="index" :class="podcast.expanded ? 'expanded' : '' ">
                                <i></i>
                                <p @click="podcast.expanded = !podcast.expanded" class="podcast-title"><span>Episode {{ podcast.episode }}:</span> {{ podcast.title }}</p>

                                <transition name="expand" v-on:enter="togglePodcastEnter" v-on:leave="togglePodcastLeave">
                                    <div class="item-content" v-show="podcast.expanded" ref="podcast">
                                        <pbl-audio-player :entity="podcast"></pbl-audio-player>
                                    </div>
                                </transition>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="question-form-wrapper">
                    <div class="wrapper">
                        <div class="question-form-content">
                            <h2>Submit a question</h2>
                            <p v-show="questionSubmitStatus">{{ questionSubmitStatus }}</p>

                            <textarea id="question" v-model="faqItem.question" placeholder="Hello, I have a question..."/>

                            <div class="radio-buttons">
                                <input type="radio" v-model="faqItem.type" value="private" id="private-question" />
                                <label for="private-question">I want this question to be answered privately, and the answer sent to my email</label>
                            </div>

                            <div class="radio-buttons">
                                <input type="radio" v-model="faqItem.type" value="public" id="public-question" />
                                <label for="public-question">I want this question to be public and the answer listed on the FAQ</label>
                            </div>

                            <button class="button" @click.prevent="submitQuestion">Submit</button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';
import pblAudioPlayer from 'components/ui/audioPlayer';
import errorHandler from 'utils/errorHandler';
import firebase from 'firebase';
import Velocity from 'velocity-animate';

export default {
    data() {
        return {
            error: false,
            email: null,
            podcasts: [],
            faqItem: {
                question: 'Pellentesque lacinia aliquam eros. Quisque sagittis tortor vitae odio tristique porttitor?',
                answer: 'Aenean laoreet ante non ipsum suscipit, a dictum lacus vehicula. Etiam dolor massa, vehicula tempus lorem et, finibus tempor purus',
                type: 'private'
            },
            questionSubmitStatus: false,
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

        submitQuestion() {
            if (!this.faqItem.question || !this.faqItem.type) {
                this.questionSubmitStatus = 'Please fill required data';
                return;
            }

            firebase.database().ref().child('faq').push(
                Object.assign(this.faqItem, { email: this.currentUser.email })
            )
            .then(() => this.questionSubmitStatus = 'Question was posted')
            .catch((error) => this.questionSubmitStatus = 'Unable to post question')
        },

        fetchPodcasts() {
            firebase.database().ref('/podcasts').once('value')
            .then((podcasts) => {
                podcasts = podcasts.val();

                for (let podcast in podcasts) {
                    podcasts[podcast].expanded = false;
                }

                this.podcasts = podcasts;
                this.$nextTick(this.resizeEvent);
            })
            .catch((error) => {
                this.error = 'Unable to fetch podcasts';
                console.error(error);
            });
        },

        togglePodcastEnter(element, done) {
            Velocity(element, 'stop');

            element.style.height = 0;

            Velocity(element, { height: `${element.getAttribute('data-height')}px`, opacity: 1 }, {
                duration: 300,
                complete: () => {
                    element.style.height = '';
                    element.setAttribute('data-shown', '1');
                    done();
                }
            });
        },

        togglePodcastLeave(element, done) {
            Velocity(element, 'stop');

            Velocity(element, { height: 0, opacity: 0 }, {
                duration: 300,
                complete: () => {
                    element.style.height = '';
                    element.setAttribute('data-shown', '0');
                    this.resizeEvent([element]);
                    done();
                }
            });
        },

        resizeEvent(elements = []) {
            elements = elements.length ? elements : this.$refs.podcast;

            elements.forEach((podcastRef) => {
                const isVisible = parseInt(podcastRef.getAttribute('data-shown'));

                if (!isVisible) {
                    podcastRef.style.position = 'absolute';
                    podcastRef.style.display = 'block';
                }

                podcastRef.setAttribute('data-height', podcastRef.offsetHeight);

                if (!isVisible) {
                    podcastRef.style.position = 'relative';
                    podcastRef.style.display = 'none';
                }
            });
        }

    },

    components: {
        pblUiFormField,
        pblAudioPlayer
    },

    created() {
        this.fetchPodcasts();

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(this.resizeEvent, 300);
        });
    }
}
</script>
