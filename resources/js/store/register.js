import axios from 'axios';

const state = {
    errorOnInputMessage: []
};

const getters = {

};

const actions = {   
    async registerUserAction({ commit, dispatch }, registerInfo) {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/register', registerInfo).then(response => {
                localStorage.setItem('username', JSON.stringify(registerInfo.name));
                commit('SET_USERNAME', JSON.parse(localStorage.getItem('username')))
            }).catch(error => {
                commit('SET_ERROR_MSG',  error.response.data.errors)
            });
        });
    },
};

const mutations = {
    SET_ERROR_MSG: (state, err) => (state.errorOnInputMessage = err)
};

export default {
    state,
    getters,
    actions,
    mutations
}