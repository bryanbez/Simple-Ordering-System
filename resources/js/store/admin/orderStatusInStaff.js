import axios from 'axios';

const state = {
    message: ''
};

const getters = {



};

const actions = {

    async fetchOrderTrackList({ commit }) {
        axios.get('')
    }
 
};

const mutations = {
   
    SET_MSG: (state, response) => (state.message = response),
};

export default {
    state,
    getters,
    actions,
    mutations
}