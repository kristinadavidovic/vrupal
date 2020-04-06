<template>
    <div class="team-members">
        <div class="container">
            <h2 class="team-members__headline">
                {{ sectionTitle }}
            </h2>
            <div class="team-members__filters">
                <div class="btn"
                    @click.prevent="selectedFilter = null"
                    :class="{ 'btn--active' : !selectedFilter }">
                    Show all
                </div>
                <div class="btn"
                    v-for="(role, roleId) in roles"
                    :key="role"
                    v-html="role"
                    @click.prevent="selectedFilter = roleId"
                    :class="{ 'btn--active' : selectedFilter == roleId }">
                </div>
            </div>
            <div class="team-members__content" v-if="sortDefault">
                <Member
                    v-for="member in filtered"
                    :key="member.nid"
                    :image="member.image"
                    :name="member.name"
                    :roleId="member.roleId"
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
                roles: {},
                sortDefault: true,
                filterRole: false,
                selectedFilter: '',
            };
        },
        methods: {
            filterMembers: function(roleId) {
                console.log('ttt');

                this.sortDefault = false;
                this.filterRole = true;
                return this.teamMembers.filter(el => {
                    return el.roleId = roleId
                });
            },
        },
        computed: {
            filtered() {
                if (!this.selectedFilter) {
                    return this.teamMembers.sort((a, b) => a.position > b.position);
                }
                return this.teamMembers.filter(item => item.roleId === this.selectedFilter);
            },
        },
        mounted() {
            axios.get('api/team-members').then((response) => {
                const data = response.data;
                this.teamMembers = data;
                data.map(e => {
                    this.roles[e.roleId] = e.role
                });

            }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>
