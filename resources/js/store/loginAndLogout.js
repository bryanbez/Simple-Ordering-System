import axios from 'axios';

const state = {
   loginMessage: '',
   loginUsername: ''
};

const getters = {

};

const actions = {   
    async LoginAction({ commit, dispatch }, loginCredentials) {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/login', loginCredentials).then(response => {
                localStorage.setItem('username', JSON.stringify(response.data.username));
                commit('SET_USERNAME', JSON.parse(localStorage.getItem('username')))
            }).catch(error => {
                commit('SET_MSG',  error.response.data.errors)
            });
        });
    },

    async LogoutAction({ commit, dispatch }) {
        axios.post('/logout').then(response => {
            localStorage.setItem('username', JSON.stringify(''));
            dispatch('fetchUserName')
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    }, 

    fetchUserName({ commit }) {
        commit('SET_USERNAME', JSON.parse(localStorage.getItem('username')))
    }
};

const mutations = {
    SET_MSG: (state, response) => (state.loginMessage = response),
    SET_USERNAME: (state, response) => (state.loginUsername = response),
};

export default {
    state,
    getters,
    actions,
    mutations
}