import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeHamburguerOptions: false,
    },

    mutations: {
        setActiveHamburguerOptions(state, value) {
            state.activeHamburguerOptions = value;
        }
    },

})