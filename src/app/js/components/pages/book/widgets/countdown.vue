<template>
    <div class="book-sale-date book-body">
        <header class="book-section-header">
            <h2>Countdown</h2>
        </header>

        <div class="book-sale-dates-list">
            <div class="date-block" v-for="(date, index) in newDate" :key="index">
                <span>{{ date.value }}</span>
                <p>{{ date.title }}</p>
            </div>
        </div>

         <p class="book-sale-start-date" v-if="isStarted">
            Crowdfunding ends on 9th of December.
        </p>

        <p class="book-sale-start-date" v-else>
            Crowdfunding starts on 9th of December.
        </p>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            startDate: '01-01-2020',
            duration: 20,
            newDate: [
                {
                    title: 'days',
                    value: 0,
                },
                {
                    title: 'hours',
                    value: 0,
                },
                {
                    title: 'mins',
                    value: 0,
                },
                {
                    title: 'secs',
                    value: 0,
                }
            ]
        }
    },

    computed: {
        isStarted() {
            const today = moment(moment().utc().format('YYYY-MM-DD hh:mm:ss'));
            const startDate = moment(this.startDate);
            return today.isBefore(startDate);
        }
    },

    methods: {
        parseMillisecondsIntoReadableTime() {
            const milliseconds = this.getMsDifference();

            // Get days from milliseconds
            const days = milliseconds / (1000 * 60 * 60 * 24);
            const absoluteDays = Math.floor(days);
            const d = absoluteDays > 9 ? absoluteDays : `0${absoluteDays}`;

            // Get hours from milliseconds
            const hours = (days - absoluteDays) * 24;
            const absoluteHours = Math.floor(hours);
            const h = absoluteHours > 9 ? absoluteHours : `0${absoluteHours}`;

            // Get remainder from hours and convert to minutes
            const minutes = (hours - absoluteHours) * 60;
            const absoluteMinutes = Math.floor(minutes);
            const m = absoluteMinutes > 9 ? absoluteMinutes : `0${absoluteMinutes}`;

            // Get remainder from minutes and convert to seconds
            const seconds = (minutes - absoluteMinutes) * 60;
            const absoluteSeconds = Math.floor(seconds);
            const s = absoluteSeconds > 9 ? absoluteSeconds : `0${absoluteSeconds}`;

            this.newDate = [
                {
                    title: 'days',
                    value: d,
                },
                {
                    title: 'hours',
                    value: h,
                },
                {
                    title: 'mins',
                    value: m,
                },
                {
                    title: 'secs',
                    value: s,
                }
            ];
        },

        getMsDifference() {
            const today = moment(moment().utc().format('YYYY-MM-DD hh:mm:ss'));
            const startDate = moment(this.startDate);

            if (today.isBefore(startDate)) {
                const diff = moment(this.startDate).diff(today, 'milliseconds');
                return moment.duration(diff, 'milliseconds');
            } else if (moment(this.startDate).add(this.duration, 'd').isBefore(moment())) {
                return 0;
            }

            const diff = moment(this.startDate).add(this.duration, 'd').diff(today, 'milliseconds');
            return moment.duration(diff, 'milliseconds');
        }
    },

    mounted() {
        setInterval(() => {
            this.parseMillisecondsIntoReadableTime();
        }, 1000);
    }
}
</script>

