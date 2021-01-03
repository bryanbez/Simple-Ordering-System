import axios from 'axios';
import route from '../../router/index'

const state = {
  
    checkoutList: [],
    subtotal: 0,
    courier_name: '',
    deliveryFee: 0,
    withoutDiscount: 0,
    deductionAmount: 0,
    total_discounted_payment: 0,
    total_payment: 0,
    voucherMessage: '',
    payment_method: '',
    enableButtonPlaceOrder: true,
    isNameAndAddressProvided: false,

};

const getters = {


};

const actions = {

    putCartListToCheckoutList({ commit }, checkoutList) {
        commit('SET_CHECKOUT_LIST', checkoutList);
    },
    setSubTotalAction({ commit, dispatch }, subtotal) {
        commit('SET_SUBTOTAL', subtotal)
        commit('SET_TOTAL_PAYMENT')

    },
    async setCourierChoiceAction({ commit, dispatch }, courier_id) {
        axios.get(`http://127.0.0.1:8000/api/courier/${courier_id}`)
        .then(response => {
            commit('SET_DELIVERY_FEE', response.data.courier_base_price);
            commit('SET_COURIER_CHOICE', response.data.courier_name);
            commit('SET_TOTAL_PAYMENT')
            dispatch('checkIfPaymentMethodProvide')
        }).then(error => {
            //commit('SET_COURIER_MSG', error)
        });
    },

    setPaymentMethodAction({ commit, dispatch }, payment_method) {
        commit('SET_PAYMENT_METHOD', payment_method)
        dispatch('checkIfPaymentMethodProvide')
    },

    checkIfNameAndAddressProvide({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/profile/${JSON.parse(localStorage.getItem('user_id'))}`)
        .then(response => {
            if(response.data['address'] == null || response.data['first_name'] == null || response.data['last_name'] == null) {
                commit('IS_NAME_AND_ADDRESS_PROVIDE', false)
            }
            else {
                commit('IS_NAME_AND_ADDRESS_PROVIDE', true)
            }
        }).catch(error => {
            //commit('SET_MSG',  error.response.data.errors)
        });
    },

    checkIfPaymentMethodProvide({ commit }) {
        if (state.payment_method != '' && state.isNameAndAddressProvided == true && state.courier_name != '') {
            console.log('Completed')
            commit('SET_BUTTON_PLACE_ORDER', false)
        }
        else {
            commit('SET_BUTTON_PLACE_ORDER', true)
        }
    },

    listAllOrderDetailsToCheckout({ commit }, orderDetails) {
        axios.post(`http://127.0.0.1:8000/api/order/`, orderDetails)
        .then(response => {
            console.log(response.data)
            route.push('/order')
        }).then(error => {
            //commit('SET_COURIER_MSG', error)
        });
    },

    async verifyVoucherAvailability({ commit }, voucher_info_to_pass) {
        axios.post(`http://127.0.0.1:8000/api/voucher/to_use/`, voucher_info_to_pass)
        .then(response => {
            commit('SET_VOUCHER_AVAIL_MESSAGE', response.data['message']);
            commit('SET_TOTAL_DISCOUNTED_PAYMENT', response.data['discount_price'])
            commit('SET_DEDUCTION_AMOUNT', response.data['deduction'])
        }).catch(error => { 
            commit('SET_ERR_MESSAGE', error)
        });
    }, 
 
};

const mutations = {
    SET_CHECKOUT_LIST: (state, response) => state.checkoutList = response,
    SET_SUBTOTAL: (state, response) => state.subtotal = response,
    SET_BUTTON_PLACE_ORDER: (state, response) => state.enableButtonPlaceOrder = response,
    SET_COURIER_CHOICE: (state, response) => state.courier_name = response, 
    SET_DELIVERY_FEE: (state, delivery_fee) => state.deliveryFee = delivery_fee,
    SET_PAYMENT_METHOD: (state, payment_method) => state.payment_method = payment_method,
    SET_TOTAL_PAYMENT: (state) => {
        if (state.deliveryFee == 0) {
            state.total_payment = state.subtotal
            state.withoutDiscount = state.subtotal
        }
        state.total_payment = state.subtotal + state.deliveryFee
        state.withoutDiscount = state.subtotal + state.deliveryFee
    },
    SET_TOTAL_DISCOUNTED_PAYMENT: (state, discounted) => {
        if (state.deductionAmount == 0) {
            state.total_payment = state.withoutDiscount
        }
        state.total_payment = discounted  
    },
    SET_VOUCHER_AVAIL_MESSAGE: (state, message) => state.voucherMessage = message,
    SET_DEDUCTION_AMOUNT: (state, deduction) => state.deductionAmount = deduction,
    IS_NAME_AND_ADDRESS_PROVIDE: (state, boolean) => state.isNameAndAddressProvided = boolean
};

export default {
    state,
    getters,
    actions,
    mutations
}