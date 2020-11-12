import axios from 'axios';

const state = {
    cartMessage: '',
    errorResponse: '',
    cartCount: ''
};

const getters = {


};

const actions = {
    
    async addToCartAction({ commit, dispatch }, cartInfo) {
        axios.post(`http://127.0.0.1:8000/api/cart/`, cartInfo)
        .then(response => {
            dispatch('getCartItems');
            commit('CART_MESSAGE', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async getCartItems({ commit }) {
        axios.get(`http://127.0.0.1:8000/api/cart/count/${JSON.parse(localStorage.getItem('user_id'))}`)
        .then(response => {
            commit('CART_COUNT', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    }

};

const mutations = {
    CART_MESSAGE: (state, response) => (state.cartMessage = response),
    SET_MSG: (state, response) => (state.errorResponse = response),
    CART_COUNT: (state, response) => (state.cartCount = response)

};


export default {
    state,
    getters,
    actions,
    mutations
}