import axios from 'axios';

const state = {
  
    profileOfUser: [],
    updateProfileMsg: []
};

const getters = {


};

const actions = {

    async fetchProfile({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/profile/${JSON.parse(localStorage.getItem('username'))}`)
        .then(response => {
            commit('PUT_PROFILE_INFO', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    async updateProfileAction({ commit, dispatch }, profileInfo) {
        axios.put(`http://127.0.0.1:8000/api/profile/${JSON.parse(localStorage.getItem('username'))}`, profileInfo)
        .then(response => {
            dispatch('fetchProfile')
            commit('UPDATE_PROFILE_MSG', response);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    }
};

const mutations = {
  
    PUT_PROFILE_INFO: (state, response) => (state.profileOfUser = response),
    UPDATE_PROFILE_MSG: (state, response) => (state.updateProfileMsg = response) 
};

export default {
    state,
    getters,
    actions,
    mutations
}