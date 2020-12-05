import axios from 'axios';

const state = {
  
    checkoutList: [],
    subtotal: 0,
    deliveryFee: 0,
    total_payment: 0,
    enableButtonPlaceOrder: true,
    isNameAndAddressProvided: false,

};

const getters = {


};

const actions = {

    putCartListToCheckoutList({ commit }, checkoutList) {
        commit('SET_CHECKOUT_LIST', checkoutList);
    },
    setSubTotalAction({ commit }, subtotal) {
        commit('SET_SUBTOTAL', subtotal)
        commit('SET_TOTAL_PAYMENT')
    },
    async setCourierChoiceAction({ commit, dispatch }, courier_id) {
        axios.get(`http://127.0.0.1:8000/api/courier/${courier_id}`)
        .then(response => {
            dispatch('checkIfNameAndAddressProvide')
            commit('SET_DELIVERY_FEE', response.data.courier_base_price);
            commit('SET_TOTAL_PAYMENT')
        }).then(error => {
            //commit('SET_COURIER_MSG', error)
        });
    },

    checkIfNameAndAddressProvide({ commit, dispatch }) {
        
        axios.get(`http://127.0.0.1:8000/api/profile/${JSON.parse(localStorage.getItem('username'))}`)
        .then(response => {
            if(response.data['address'] == null || response.data['first_name'] == null || response.data['last_name'] == null) {
                commit('SET_BUTTON_PLACE_ORER', true)
            }
            else {
                commit('SET_BUTTON_PLACE_ORER', false)
            }
        }).catch(error => {
            //commit('SET_MSG',  error.response.data.errors)
        });
    },

    listAllOrderDetailsToCheckout({ commit }, orderDetails) {
        axios.post(`http://127.0.0.1:8000/api/order/`, orderDetails)
        .then(response => {
            console.log(response.data)
        }).then(error => {
            //commit('SET_COURIER_MSG', error)
        });
    }
 
};

const mutations = {
    SET_CHECKOUT_LIST: (state, response) => state.checkoutList = response,
    SET_SUBTOTAL: (state, response) => state.subtotal = response,
    SET_BUTTON_PLACE_ORER: (state, response) => state.enableButtonPlaceOrder = response,
    SET_DELIVERY_FEE: (state, delivery_fee) => {
        state.deliveryFee = delivery_fee
    },
    SET_TOTAL_PAYMENT: (state) => {
        if (state.deliveryFee == 0) {
            state.total_payment = state.subtotal
        }
        state.total_payment = state.subtotal + state.deliveryFee
        return state.total_payment
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}