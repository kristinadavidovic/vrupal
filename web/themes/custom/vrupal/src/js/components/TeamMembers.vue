<template>
    <div class="team-members">
        <div class="container">
            <h2 class="team-members__headline">
                {{ sectionTitle }}
            </h2>
            <div class="team-members__filters">
                <button>
                    Show all
                </button>
            </div>
            <div class="team-members__content">
                <Member v-for="member in sortedMembers" :key="member.id"
                    :image="member.image"
                    :name="member.name"
                    :role="member.role">
                </Member>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Member from './Member';

    export default {
        name: 'team-members',
        components: {
            Member,
        },
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
