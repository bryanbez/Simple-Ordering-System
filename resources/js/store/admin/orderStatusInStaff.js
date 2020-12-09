import axios from 'axios';

const state = {
    message: ''
};

const getters = {



};

const actions = {

    async fetchOrderTrackListInStaff({ commit }) {
        axios.get('http://127.0.0.1:8000/api/user_of_app/')
    },

    async fetchOrderTrackListInCourier({ commit }) {
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