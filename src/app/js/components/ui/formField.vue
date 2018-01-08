<template>
    <div class="form-field">
        <template v-if="description">
            <div class="input-description" :class="{ disabled }">
                <label :for="id">{{ title }}</label>

                <div class="input-block">
                    <div class="input-field">
                        <input :id="id" :type="type" @keyup="returnValue" @change="returnValue" v-model="value" :disabled="disabled">
                    </div>

                    <div class="input-symbol" v-if="symbol !== null">
                        {{ symbol }}
                    </div>

                    <div class="input-info" v-html="body" v-if="body !== null"></div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="input" :class="{ disabled }">
                <label :for="id">{{ title }}</label>

                <template v-if="type !== 'textarea'">
                    <input :id="id" :type="type" v-model="value" @keyup="returnValue" :disabled="disabled">
                </template>

                <template v-else>
                    <textarea :id="id" cols="30" rows="5" v-model="value" @keyup="returnValue" :disabled="disabled"></textarea>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            required: true,
            type: String
        },

        initValue: {
            required: false,
            type: [String, Number],
            default: null
        },

        title: {
            required: true,
            type: String
        },

        description: {
            required: false,
            type: Boolean,
            default: false
        },

        type: {
            required: true,
            type: String
        },

        disabled: {
            required: false,
            type: Boolean,
            default: false
        },

        symbol: {
            required: false,
            type: String,
            default: null
        },

        body: {
            required: false,
            type: String,
            default: null
        }
    },

    data() {
        return {
            value: this.initValue
        }
    },

    methods: {
        returnValue() {
            this.$emit('changed', this.value);
        }
    },

    watch: {
        initValue(newV) {
            this.value = newV;
        }
    }
}
</script>
