import axios from 'axios';
import router from '../router';

const state = {
    errorOnInputMessage: [],
    login_message: []
};

const getters = {

};

const actions = {   
    async registerUserAction({ commit, dispatch }, registerInfo) {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/register', registerInfo).then(response => {
                //localStorage.setItem('username', JSON.stringify(registerInfo.name));
                axios.post('/logout').then(response => {
                    localStorage.setItem('username', JSON.stringify(''));
                    localStorage.setItem('user_id', JSON.stringify(''));
                    router.push('/')
                   
                    commit('SET_GO_TO_LOGIN_PAGE', 'User created. Please login');
                });
                
            }).catch(error => {
                commit('SET_ERROR_MSG',  error.response.data.errors)
            });
        });
    },

};

const mutations = {
    SET_ERROR_MSG: (state, err) => (state.errorOnInputMessage = err),
    SET_GO_TO_LOGIN_PAGE: (state, response) => (state.login_message =  response)
};

export default {
    state,
    getters,
    actions,
    mutations
}