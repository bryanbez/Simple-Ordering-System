import axios from 'axios';

const state = {
  
    listVoucher: [],
    message: '',
    errorMessage: '',
    singleVoucher: [],
    inputError: []
};

const getters = {

};

const actions = {
    async saveVoucher({ commit, dispatch}, voucher) {
        axios.post('http://127.0.0.1:8000/api/voucher', voucher)
        .then(response => {
            dispatch('fetchListOfVoucher')
            commit('SET_MESSAGE', response.data);
        }).catch(error => { 
            commit('SET_INPUT_ERR_MESSAGE', error.response.data.errors)
        });
    },

    async fetchListOfVoucher({ commit }) {
        axios.get('http://127.0.0.1:8000/api/voucher')
        .then(response => {
            commit('SET_LIST_VOUCHER', response.data);
        }).catch(error => { 
            commit('SET_ERR_MESSAGE', error)
        });
    },

    async fetchListOfSpecificVoucher({ commit }, voucher_id) {
        axios.get(`http://127.0.0.1:8000/api/voucher/${voucher_id}`)
        .then(response => {
            commit('SET_SINGLE_VOUCHER', response.data);
        }).catch(error => { 
            commit('SET_ERR_MESSAGE', error)
        });
    },

    async updateVoucherAction({ commit, dispatch }, singleVoucher) {
        axios.put(`http://127.0.0.1:8000/api/voucher/${singleVoucher._value['voucher_id']}`, singleVoucher._value)
        .then(response => {
            dispatch('fetchListOfVoucher');
            dispatch('cleanMessage');
            commit('SET_MESSAGE', response.data);

        }).catch(error => { 
            commit('SET_INPUT_ERR_MESSAGE', error.response.data.errors)
        });
    },

    async removeVoucherAction({ commit, dispatch }, voucher_id) {
        axios.delete(`http://127.0.0.1:8000/api/voucher/${voucher_id}`)
        .then(response => {
            dispatch('fetchListOfVoucher');
            commit('SET_MESSAGE', response.data);

        }).catch(error => { 
            commit('SET_ERR_MESSAGE', error)
        });
    },

    cleanMessage({ commit }) {

        commit('SET_MESSAGE', '')
        commit('SET_INPUT_ERR_MESSAGE', '')
    }


};

const mutations = {
    SET_LIST_VOUCHER: (state, response) => state.listVoucher = response,
    SET_MESSAGE: (state, message) => state.message = message,
    SET_ERR_MESSAGE: (state, error) => state.errorMessage = error,
    SET_SINGLE_VOUCHER: (state, response) => state.singleVoucher = response,
    SET_INPUT_ERR_MESSAGE: (state, response) => state.inputError = response

};

export default {
    state,
    getters,
    actions,
    mutations
}