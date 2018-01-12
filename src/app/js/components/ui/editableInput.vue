<template>
    <div class="edit-input">
        <h4 v-if="saved">
            {{ value }}
            <span @click="saved = false">edit</span>
        </h4>

        <template v-if="!saved">
            <p><input type="text" v-model="value"></p>
            <p><button class="button button-active-action" @click="save">Save</button></p>
        </template>
    </div>
</template>

<script>
export default {
    props: {
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
