import axios from 'axios';
import router from '../router';

const state = {
   loginMessage: '',
   loginUsername: '',
   loginUsernameID: '',
};

const getters = {

};

const actions = {   
    async LoginAction({ commit, dispatch }, loginCredentials) {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/login', loginCredentials).then(response => {
                if (response.data.username != 'undefined') {
                    localStorage.setItem('username', JSON.stringify(response.data.username));
                    localStorage.setItem('user_id', JSON.stringify(response.data.user_id));
                    if (response.data.username === 'admin') {
                        router.push('/admin/dashboard')
                    }
                    else {
                        router.push({ name: 'UserHome' })
                    }
                    commit('SET_USERNAME', JSON.parse(localStorage.getItem('username')))
                    commit('SET_USERNAME_ID', JSON.parse(localStorage.getItem('user_id')))
                }
                else {
                    this.LogoutAction()
                    return 'Failed To Login. Try Again'
                }
              
            }).catch(error => {
                commit('SET_MSG',  error.response.data.errors)
            });
        });
    },

    async LogoutAction({ commit, dispatch }) {
        axios.post('/logout').then(response => {
            localStorage.setItem('username', JSON.stringify(''));
            localStorage.setItem('user_id', JSON.stringify(''));
            router.push('/')
            //dispatch('fetchUserName')
            commit('SET_USERNAME', '')
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
    SET_USERNAME_ID: (state, response) => (state.loginUsernameID = response)
};

export default {
    state,
    getters,
    actions,
    mutations
}