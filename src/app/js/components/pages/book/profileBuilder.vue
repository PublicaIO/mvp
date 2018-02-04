<template>
    <div id="page-ui-builder">
        <main>
            <div class="book-view-wrapper">
                <header class="book-heading">
                    <h4>
                        The next book by <strong>Dade Murphy</strong>
                    </h4>

                    <h1 class="book-title">
                        Book title
                    </h1>

                    <h2 class="book-promotion">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis nesciunt corrupti quo, minus unde rerum, culpa, qui obcaecati autem eos suscipit ipsum quaerat vel consequuntur maiores ab similique ea molestiae?
                    </h2>
                </header>
            </div>

            <draggable v-model="sections" @start="drag=true" @end="drag=false">
                <section v-for="(section, index) in sections" :key="index">
                    <!-- <div :is="section.component"></div> -->
                    <div>
                        <ui-editable-input custom-class="section-title" :init-value="section.title" @saved="section.title = arguments[0]"></ui-editable-input>
                        <p>{{ section.component }}</p>
                    </div>
                </section>
            </draggable>

            <section class="new-section">
                <h2>Add Widget</h2>

                <div class="new-section-block">
                    <div class="new-section-block-content" v-for="(widget, index) in widgets" @click="createContent(widget)" :key="index">
                        <p>
                            {{ widget.title }}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import errorHandler from 'utils/errorHandler';
import widgetCountdown from 'components/pages/book/widgets/countdown';
import uiEditableInput from 'components/ui/editableInput';
import draggable from 'vuedraggable';

export default {
    data() {
        return {
            sections: [],
            drag: false,
            book: false,

            widgets: [
                {
                    title: 'Content',
                    component: 'customcontent'
                },
                {
                    title: 'Countdown',
                    component: 'countdown'
                },
                {
                    title: 'E-Mail Sign Up',
                    component: 'signup'
                },
                {
                    title: 'Crowdfunding',
                    component: 'crowdfunding'
                },
                {
                    title: 'About Author',
                    component: 'aboutauthor'
                },
                {
                    title: 'Comments',
                    component: 'comments'
                },
                {
                    title: 'Updates (Roadmap)',
                    component: 'updates'
                },
                {
                    title: 'Twitter Feed',
                    component: 'twitterfeed'
                },
                {
                    title: 'Milestones',
                    component: 'milestones'
                },
                {
                    title: 'Costs Breakdown',
                    component: 'costsbreakdown'
                },
                {
                    title: 'Book List',
                    component: 'booklist'
                },
                {
                    title: 'Social Media',
                    component: 'socialmedia'
                },
                {
                    title: 'Stretch Goals',
                    component: 'stretchgoals'
                },
                {
                    title: 'About Book',
                    component: 'aboutbook'
                }
            ]
        }
    },

    methods: {
        createContent(widget) {
            const data = {
                id: null,
                title: widget.title,
                component: widget.component,
                content: null
            }
            this.sections.push(data);
            this.tempContent = null;
        }
    },

    mounted() {
        const bookID = this.$route.params.id;

        axios.get(`/book/${bookID}`)
            .then(resp => this.book = resp.data.book)
            .catch(errorHandler);
    },

    components: {
        widgetCountdown,
        uiEditableInput,
        draggable
    }
}
</script>
