import axios from 'axios';

const state = {
    cartMessage: '',
    errorResponse: '',
    cartCount: '',
    cartList: [],
    specificCartInfo: [],
    total_price: '',
    cartRemoveMsg: ''
};

const getters = {

    totalPriceToCheckout: (state) => {
        var totalPriceInCart = 0

        if (state.cartList == 'null') {
            return 0;
        }
        else {
            state.cartList.forEach((value, index) => {
                totalPriceInCart = totalPriceInCart + value['total_price']
            });
            return totalPriceInCart;
        }
    },

};

const actions = {

    async getCartItems({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/cart/${JSON.parse(localStorage.getItem('user_id'))}`)
        .then(response => {
            commit('CART_LIST', response.data);
              
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    
    async addToCartAction({ commit, dispatch }, cartInfo) {
        axios.post(`http://127.0.0.1:8000/api/cart/`, cartInfo)
        .then(response => {
            dispatch('getCartItems');
            dispatch('getCartItemsCount');
            commit('CART_MESSAGE', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async getCartItemsCount({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/cart/count/${JSON.parse(localStorage.getItem('user_id'))}`)
        .then(response => {
            commit('CART_COUNT', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async getSpecificCartItemInfo({ commit }, cart_id) {
        axios.get(`http://127.0.0.1:8000/api/cart/info/${cart_id}`)
        .then(response => {
            commit('ITEM_INFO', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async changeQty({ commit }, quantityAndPrice) {
        state.total_price = quantityAndPrice.price * quantityAndPrice.quantity
        commit('CHANGE_TOTAL_PRICE', state.total_price)
    },

    async changeQuantityAndPriceOfCartItem({ commit, dispatch }) {
        axios.put(`http://127.0.0.1:8000/api/cart/info/${state.specificCartInfo.cart_id}`, state.specificCartInfo)
        .then(response => {
            commit('CHANGE_QTY_AND_PRICE_INFO', response.data);
            dispatch('getCartItems')
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async clearCartMessageAction({ commit }) {
        commit('CLEAR_CART_MESSAGE', '');
    },

    async removeCartItem({ commit, dispatch }, cart_id) {
        axios.delete(`http://127.0.0.1:8000/api/cart/${cart_id}`)
        .then(response => {
            commit('CART_REMOVE_MESSAGE', response.data);
            dispatch('getCartItems')
            dispatch('getCartItemsCount');
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async clearCartRemoveMessageAction({ commit }) {
        commit('CART_REMOVE_MESSAGE', '');
    }

};

const mutations = {
    CART_MESSAGE: (state, response) => (state.cartMessage = response),
    SET_MSG: (state, response) => (state.errorResponse = response),
    CART_COUNT: (state, response) => (state.cartCount = response),
    CART_LIST: (state, response) => (state.cartList = response),
    ITEM_INFO: (state, response) => (state.specificCartInfo = response),
    CHANGE_QTY_AND_PRICE_INFO: (state, response) => (state.cartMessage = response),
    CHANGE_TOTAL_PRICE: (state, response) => (state.specificCartInfo.total_price = response),
    CLEAR_CART_MESSAGE: (state, response) => (state.cartMessage = ''),
    CART_REMOVE_MESSAGE: (state, response) => (state.cartRemoveMsg = response)
};


export default {
    state,
    getters,
    actions,
    mutations
}