import axios from 'axios';

const state = {
    courierMsg: null,
    courierList: [],
    specificCourier: [],
    deleteCourierMsg: null
};

const getters = {


};

const actions = {

    async addCourierAction({ commit, dispatch }, courierInfo) {
        axios.post(`http://127.0.0.1:8000/api/courier`, courierInfo)
        .then(response => {
            commit('SET_COURIER_MSG', response.data)
            dispatch('fetchCourierList')
        }).then(error => {
            commit('SET_COURIER_MSG', error)
        });
    },

    async fetchCourierList({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/courier`)
        .then(response => {
            commit('SET_COURIER_LIST', response.data)
        }).then(error => {
            commit('SET_COURIER_MSG', error)
        });
    },

    async fetchSpecificCourier({ commit }, courier_id) {
        axios.get(`http://127.0.0.1:8000/api/courier/${courier_id}`)
        .then(response => {
            commit('SET_SPECIFIC_COURIER', response.data)
        }).then(error => {
            commit('SET_COURIER_MSG', error)
        });
    },

    async updateCourierAction({ commit, dispatch }, courierInfo) {
        axios.put(`http://127.0.0.1:8000/api/courier/${courierInfo._value['courier_id']}`, courierInfo)
        .then(response => {
            commit('SET_COURIER_MSG', response.data)
            dispatch('fetchCourierList')
        }).then(error => {
            commit('SET_COURIER_MSG', error)
        });
        
    },

    async removeCourierAction({ commit, dispatch }, courier_id) {
        axios.delete(`http://127.0.0.1:8000/api/courier/${courier_id}`)
        .then(response => {
            commit('SET_DELETE_COURIER_MSG', response.data)
            dispatch('fetchCourierList')
        }).then(error => {
            commit('SET_DELETE_COURIER_MSG', error)
        });
    }
 
};

const mutations = {
    SET_COURIER_MSG: (state, response) => state.courierMsg = response,
    SET_COURIER_LIST: (state, response) => state.courierList = response,
    SET_SPECIFIC_COURIER: (state, response) => state.specificCourier = response,
    SET_DELETE_COURIER_MSG: (state, response) => state.deleteCourierMsg = response
};

export default {
    state,
    getters,
    actions,
    mutations
}