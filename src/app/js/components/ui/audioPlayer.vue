<template>
    <div class="audio-player-wrapper">
        <audio ref="player" controls controlsList="nodownload" >
            <source :src="entity.url">
            Your browser does not support the audio element.
        </audio>

        <div class="progress-bar">
            <div class="bar" ref="progress_bar"></div>
            <div class="position" :style="{ width: `${this.currentProgress}%` }"></div>
            <span
                class="seeker"
                draggable="true"
                :style="{ left: `calc(${this.currentProgress}% - 10px)` }"
                ref="seeker"
            ></span>
        </div>

        <div class="actions">
            <div class="group1">
                <a @click.prevent="playToggle" href="#!" :class="{ playing: isPlaying, 'playback-button': true} "></a>
                <div class="ticker">
                    {{this.timeFromSeconds(this.position)}}/{{this.timeFromSeconds(this.duration)}}
                </div>
            </div>

            <div class="group2">
                <a @click.prevent="showTranscript" href="#!">Show transcript</a>
                <a :href="`/podcast/getMP3?id=${entity.ID}`" target="_blank">Download MP3</a>
            </div>
        </div>

        <div class="transcript" v-show="transcriptVisible">
            <p class="semi-title">Transcript:</p>
            <pre>{{ entity.transcript }}</pre>
        </div>
    </div>
</template>

<script>

import clamp from 'utils/clamp';
import interact from 'interactjs';
import axios from 'axios';

export default {
    props: {
        entity: {
            required: true,
            type: Object
        }
    },

    computed: {
        currentProgress() {
            return this.position * 100 / this.duration;
        }
    },

    data() {
        return {
            transcriptVisible: false,
            isPlaying: false,
            position: 0,
            duration: 0
        }
    },

    methods: {
        playToggle(event) {
            event.stopPropagation();

            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        },

        play() {
            this.player.play();
            this.isPlaying = true;
        },

        pause() {
            this.player.pause();
            this.isPlaying = false;
        },

        timeFromSeconds(rawSeconds) {
            const hours = (rawSeconds / 3600) >> 0;
            const minutes = (rawSeconds / 60) >> 0;
            const seconds = Math.floor(rawSeconds % 60);

            let time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

            if (hours > 0) {
                if (minutes < 10) {
                    time = `${hours}:0${minutes}`
                } else {
                    time = `${hours}:${minutes}`
                }
            }

            return time;
        },

        onSeekerDragStart(event) {
            this.pause();
        },

        onSeekerDrag(event) {
            const barWidth = this.$refs.progress_bar.clientWidth;
            this.position = clamp(this.position + (event.dx * this.duration / barWidth), 0, this.duration);
        },

        onSeekerDragEnd(event) {
            this.player.currentTime = this.position;
            this.play();
        },

        showTranscript(event) {
            event.stopPropagation();
            this.transcriptVisible = !this.transcriptVisible;
        }
    },

    mounted() {
        this.player = this.$refs.player;

        this.player.addEventListener('loadedmetadata', () => {
            this.duration = this.player.duration;
        });

        this.player.addEventListener('play', () => {
            this.isPlaying = true;
        });

        this.player.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        this.player.addEventListener('timeupdate', () => {
            this.position = this.player.currentTime;
        });

        interact(this.$refs.seeker).draggable({
            onstart: this.onSeekerDragStart,
            onmove: this.onSeekerDrag,
            onend: this.onSeekerDragEnd
        });
    }
}
</script>
