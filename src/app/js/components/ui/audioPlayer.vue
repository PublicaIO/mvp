<template>
    <div class="audio-player-wrapper">
        <audio ref="player" controls controlsList="nodownload">
            <source :src="entity.url">
            Your browser does not support the audio element.
        </audio>

        <div class="progress-bar">
            <div class="bar"></div>
            <div class="position" :style="{ width: `${this.currentProgress}%` }">
                <span
                    draggable="true"
                    v-on:dragstart="onSeekerDragStart"
                    v-on:drag="onSeekerDrag"
                    v-on:dragend="onSeekerDragEnd"
                    :style="{ left: this.position > 0 ? '' : '0px' }"
                ></span>
            </div>
        </div>

        <div class="actions">
            <a @click.prevent="play" href="#!" :class="{ playing: isPlaying, 'playback-button': true} "></a>

            <div class="ticker">
                {{this.timeFromSeconds(this.position)}}/{{this.timeFromSeconds(this.duration)}}
            </div>

            <a href="#!">Download MP3</a>
            <a href="#!">Show transcript</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        entity: {
            required: true,
            type: Object,
            default() {
                return null;
            }
        }
    },

    computed: {
        currentProgress() {
            return this.position * 100 / this.duration;
        }
    },

    data() {
        return {
            isPlaying: false,
            position: 0,
            duration: 0,
        }
    },

    methods: {
        play(event) {
            event.stopPropagation();
            const player = this.$refs.player;

            if (this.isPlaying) {
                player.pause();
            } else {
                player.play();
            }

            this.isPlaying = !this.isPlaying;
        },

        timeFromSeconds(rawSeconds) {
            const hours = (rawSeconds / 3600) >> 0;
            const minutes = (rawSeconds / 60) >> 0;
            const seconds = Math.floor(rawSeconds % 60);

            let time = `${minutes}:${seconds > 10 ? seconds : `0${seconds}`}`;

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
            this.seekerPosition = event.pageX;
            console.log(`started at ${this.seekerPosition}`);
        },

        onSeekerDrag(event) {
            console.log(`${event.pageX - this.seekerPosition}px`);
            event.currentTarget.style.left = '';
            event.currentTarget.style.right = `${event.pageX - this.seekerPosition}px`;
        },

        onSeekerDragEnd(event) {
            this.currentTime = this.position;
        }
    },

    mounted() {
        const player = this.$refs.player;

        player.addEventListener('loadedmetadata', () => {
            this.duration = player.duration;
        });

        player.addEventListener('play', () => {
            this.isPlaying = true;
        });

        player.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        player.addEventListener('timeupdate', () => {
            this.position = player.currentTime;
        });
    }
}
</script>
