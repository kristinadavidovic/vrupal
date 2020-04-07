<template>
    <div class="team-members">
        <div class="container">
            <h2 class="team-members__headline">
                {{ sectionTitle }}
            </h2>
        </div>
        <div class="container container--large">
            <div class="team-members__filters">
                <h3>Filters
                    <span @click.prevent="reset"
                        class="team-members__filters--reset">
                        Reset
                    </span>
                </h3>
                <div class="team-members__filter-section">
                    <input type="text" v-model="search" placeholder="Search ...">
                </div>
                <div class="team-members__filter-section">
                    <div class="team-members__filter team-members__filter--reset"
                        @click.prevent="selectedFilter = null"
                        :class="{ 'team-members__filter--active' : !selectedFilter }">
                        Show all
                    </div>
                    <div class="team-members__filter"
                        v-for="(role, roleId) in roles"
                        :key="role"
                        v-html="role"
                        @click.prevent="selectedFilter = roleId, search = ''"
                        :class="{ 'team-members__filter--active' : selectedFilter == roleId }">
                    </div>
                </div>
            </div>
            <div class="team-members__content">
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

                selectedFilter: '',
                search: '',
            };
        },
        methods: {
            reset() {
                this.search = '';
                this.selectedFilter = '';
            },
        },
        computed: {
            filtered() {
                if (!this.selectedFilter && this.search == '') {
                    return this.teamMembers.sort((a, b) => a.position > b.position);
                }

                return this.teamMembers.filter(item => {
                    let regexp = new RegExp(`(?=.*${this.selectedFilter})(?=.*${this.search})`, 'gi');
                    return item.name.match(regexp) || item.roleId.match(regexp);
                });
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
