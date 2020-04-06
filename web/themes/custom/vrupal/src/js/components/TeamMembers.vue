<template>
    <div class="team-members">
        <div class="container">
            <h2 class="team-members__headline">
                {{ sectionTitle }}
            </h2>
            <div class="team-members__filters">
                Filters
            </div>
            <div class="team-members__content">
                <div class="team-member" v-for="member in sortedMembers" :key="member.id">
                    <div class="team-member__image">
                        <img :src="member.image" />
                    </div>
                    <div class="team-memeber__info">
                        <h3 class="team-member__name">
                            {{ member.name }}
                        </h3>
                        <div class="team-memeber__role" v-html="member.role">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'team-members',
        props: {
            sectionTitle: {
                required: true,
                type: String,
            }
        },
        data() {
            return {
                teamMembers: [],
            };
        },
        computed: {
            sortedMembers: function() {
                return this.teamMembers.sort((a, b) => a.position > b.position);
            }
        },
        mounted() {
            axios.get('api/team-members').then((response) => {
                const data = response.data;
                this.teamMembers = data;
            }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>
