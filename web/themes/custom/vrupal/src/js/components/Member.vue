<template>
    <div class="team-member">
        <div class="team-member__image">
            <img :src="image" />
        </div>
        <div class="team-memeber__info">
            <h3 class="team-member__name">{{ name }}</h3>
            <div class="team-memeber__role" v-html="role"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'member',
        props: {
            image: {
                required: true,
                type: String,
            },
            name: {
                required: true,
                type: String,
            },
            role: {
                type: String,
            }
        },
        data() {
            return {

            };
        },
    }
</script>
