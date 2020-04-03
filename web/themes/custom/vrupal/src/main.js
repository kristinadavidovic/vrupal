import Vue from 'vue';

// components
import TeamMembers from './js/components/TeamMembers';

// Stylings
import './scss/app.scss'; // whole site stylings

Vue.config.productionTip = false;

Vue.component('team-members', TeamMembers);

if (document.querySelectorAll('#team-members').length > 0) {
    new Vue({
        el: '#team-members',
        comments: true,
    });
}
