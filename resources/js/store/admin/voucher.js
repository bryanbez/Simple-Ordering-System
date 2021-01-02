import axios from 'axios';

const state = {
  
    listVoucher: [],
    message: '',
    errorMessage: '',
    singleVoucher: []
};

const getters = {

};

const actions = {
    async saveVoucher({ commit, dispatch}, voucher) {
        axios.post('http://127.0.0.1:8000/api/voucher', voucher)
        .then(response => {
            commit('SET_SAVE_UPDATE_VOUCHER_MESSAGE', response.data);
        }).catch(error => { 
            commit('SET_ERR_MESSAGE', error)
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
        console.log(singleVoucher)
        axios.put(`http://127.0.0.1:8000/api/voucher/${singleVoucher._value['voucher_id']}`, singleVoucher._value)
        .then(response => {
            dispatch('fetchListOfVoucher');
            commit('SET_SAVE_UPDATE_VOUCHER_MESSAGE', response.data);

        }).catch(error => { 
            commit('SET_ERR_MESSAGE', error)
        });
    }


};

const mutations = {
    SET_LIST_VOUCHER: (state, response) => state.listVoucher = response,
    SET_SAVE_UPDATE_VOUCHER_MESSAGE: (state, message) => state.message = message,
    SET_ERR_MESSAGE: (state, error) => state.errorMessage = error,
    SET_SINGLE_VOUCHER: (state, response) => state.singleVoucher = response
};

export default {
    state,
    getters,
    actions,
    mutations
}