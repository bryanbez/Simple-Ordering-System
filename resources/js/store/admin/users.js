import axios from 'axios';

const state = {
    message: '',
    userList: [],
    errorOnInput: [],

};

const getters = {

};

const actions = {

    async fetchStaffAndCourier({ commit }) {
        axios.get('http://127.0.0.1:8000/api/user_of_app/')
        .then(response => {
            commit('SET_USER_LIST', response.data)
        }).catch(error => {
            commit('SET_MSG', error)
        })
    },

    async saveInfoOfStaffOrCourier({ commit, dispatch }, userInfo) {
        axios.post('http://127.0.0.1:8000/api/user_of_app/', userInfo)
        .then(response => {
            dispatch('fetchStaffAndCourier')
            // dispatch('clearSingleUserInfo')
            commit('SET_MSG', response.data)

        }).catch(error => {
            commit('SET_ERR_ON_INPUT', error.response.data.errors)
        })
    },

    clearMessage({ commit }) {
        commit('SET_MSG', '')
    },

    clearInputErrorMsg({ commit }) {
        commit('SET_ERR_ON_INPUT', '')
    }

};

const mutations = {
   
    SET_MSG: (state, response) => (state.message = response),
    SET_USER_LIST: (state, response) => (state.userList = response),
    SET_ERR_ON_INPUT: (state, response) => (state.errorOnInput = response),
   // SET_SINGLE_USER: (state, response) => (state.singleUser = response)
    
};

export default {
    state,
    getters,
    actions,
    mutations
}