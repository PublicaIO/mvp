<template>
    <div class="video-player-wrapper">
        <iframe :src="entity.url" class="podcast-video" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
    </div>
</template>

<script>

export default {
    props: {
        entity: {
            required: true,
            type: Object
        }
    }
}
</script>
