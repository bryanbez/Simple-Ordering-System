import axios from 'axios';

const state = {
    orderList: [],
    orderErrorMessage: []
};

const getters = {


};

const actions = {

    fetchAllOrders({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/order/${JSON.parse(localStorage.getItem('user_id'))}`)
        .then(response => {
            commit('PUT_ORDER_LIST', response.data)
        }).then(error => {
            commit('SET_ORDER_ERROR_MSG', error)
        });
    }
 
};

const mutations = {

    PUT_ORDER_LIST: (state, response) => state.orderList = response,
    SET_ORDER_ERROR_MSG: (state, response) => state.orderErrorMessage = response,
  
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}