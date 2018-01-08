<template>
    <div id="book-create">
        <div class="page-heading center">
            <h2 class="page-title">
                Start a new book crowdfunding
            </h2>
        </div>

        <section class="body">
            <h2>Basic book details</h2>

            <div class="form-item">
                <pbl-ui-form-field :init-value="book.title" id="title" title="Book title" type="input" @changed="book.title = arguments[0]">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="book.url" id="url" title="Your crowdfunding page address" type="input" @changed="book.url = arguments[0]">
                </pbl-ui-form-field>
            </div>
        </section>

        <div class="body">
            <h2>General Crowdfunding details</h2>
            <p>Check our crowdfunding tips and tricks for successful authors</p>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.goal" id="goal" title="Crowdfunding goal" type="input" @changed="crowdfunding.goal = arguments[0]" :description="true" symbol="$">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.price.during" id="price" title="Book price during crowdfunding" type="input" @changed="crowdfunding.price = arguments[0]" :description="true" symbol="$" body="9,000 book access keys (tokens) will be offered in the crowdsale">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.softcap" id="softcap" title="Soft cap - the minimum viable amount to release the book" type="input" @changed="crowdfunding.softcap = arguments[0]" :description="true" symbol="$" body="Please describe the difference in added value to the end product between your softcap and the goal">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.startDate" id="date" title="Crowdfunding start date" type="input" @changed="crowdfunding.startDate = arguments[0]" :description="true" body="Please mind that currently the minimum starting date for crowdfundings is June 15th, 2018">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.duration" id="duration" title="Crowdfunding duration" type="input" @changed="crowdfunding.duration = arguments[0]" :description="true" symbol="days">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.price.after" id="price_after" title="Book price after crowdfunding" type="input" @changed="crowdfunding.priceAfter = arguments[0]" :description="true" symbol="$">
                </pbl-ui-form-field>
            </div>

            <div class="form-item">
                <pbl-ui-form-field :init-value="crowdfunding.totalTokens" id="total_tokens" title="Total amount of book access keys (tokens) offered after crowdfunding" type="input" @changed="crowdfunding.totalTokens = arguments[0]">
                </pbl-ui-form-field>
            </div>

            <div class="form-item form-actions">
                <button class="button button-large button-active-action" @click.prevent="saveBook">
                    Save and proceed to promotional page builder
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pblUiFormField from 'components/ui/formField';

export default {
    data() {
        return {
            test: true,
            book: {
                title: 'null',
                url: 'null'
            },
            crowdfunding: {
                goal: 100,
                price: {
                    during: 100,
                    after: 50
                },
                softcap: 200,
                startDate: '09/12/90',
                duration: 10,
                totalTokens: 100
            }
        }
    },

    methods: {
        saveBook() {
            axios.post('/book/save', {
                book: this.book,
                crowdfunding: this.crowdfunding
            })
            .then((resp) => {
                console.log(resp);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    },

    components: {
        pblUiFormField
    }
}
</script>

