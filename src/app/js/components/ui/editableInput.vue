<template>
    <div class="edit-input">
        <h4 class="edit-input-title" v-if="saved">
            {{ value }}
            <span @click="saved = false">edit</span>
        </h4>

        <div class="edit-input-body" v-if="!saved">
            <p><input :class="customClass" type="text" v-model="value"></p>
            <p><button class="button button-active-action" @click="save">Save</button></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customClass: {
            required: false,
            type: String,
            default() {
                return null;
            }
        },

        type: {
            require: false,
            type: String,
            default() {
                return 'text';
            }
        },

        initValue: {
            require: true,
            type: String
        }
    },

    data() {
        return {
            value: null,
            saved: false
        }
    },

    methods: {
        save() {
            this.saved = true;
            this.$emit('saved', this.value);
        }
    },

    created() {
        this.value = this.initValue;
    }
}
</script>
