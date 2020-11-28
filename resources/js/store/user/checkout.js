import axios from 'axios';

const state = {
  
    checkoutList: [],
    total_payment: ''
};

const getters = {


};

const actions = {

    putCartListToCheckoutList({ commit }, checkoutList) {
        commit('SET_CHECKOUT_LIST', checkoutList);
    },
    setTotalPaymentAction({ commit }, total_payment) {
        commit('SET_TOTAL_PAYMENT', total_payment);
    }
 
};

const mutations = {
    SET_CHECKOUT_LIST: (state, response) => state.checkoutList = response,
    SET_TOTAL_PAYMENT: (state, response) => state.total_payment = response
};

export default {
    state,
    getters,
    actions,
    mutations
}