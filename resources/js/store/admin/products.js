import axios from 'axios';

const state = {
    productsList: [],
    specificProduct: [],
    message: null
};

const getters = {


};

const actions = {
    async getProducts({ commit }, urlToSend) {
     if (urlToSend.sortBy != '') {
            if (urlToSend.pageURL == '') {
                axios.get(`http://127.0.0.1:8000/api/product?sort=${urlToSend.sortBy}`)
                    .then(response => {
                        commit('PRODUCTS_INFO', response.data);
                    }).catch(error => {
                        commit('SET_MSG',  error.response.data.errors)
                });
            }
            else {
                axios.get(`${urlToSend.pageURL}&sort=${urlToSend.sortBy}`)
                    .then(response => {
                        commit('PRODUCTS_INFO', response.data);
                    }).catch(error => {
                        commit('SET_MSG',  error.response.data.errors)
                });
            }
          
        }
        else {
            if (urlToSend.pageURL) {
                axios.get(urlToSend.pageURL)
                    .then(response => {
                        commit('PRODUCTS_INFO', response.data);
                    }).catch(error => {
                        commit('SET_MSG',  error.response.data.errors)
                });
            }
            else {
                axios.get('http://127.0.0.1:8000/api/product')
                    .then(response => {
                        commit('PRODUCTS_INFO', response.data);
                    }).catch(error => {
                        commit('SET_MSG',  error.response.data.errors)
                });
            }
         
        }
       
    },

    async fetchSpecificProduct({ commit }, product_id) {
        axios.get(`http://127.0.0.1:8000/api/product/${product_id}`)
        .then(response => {
            commit('SPECIFIC_PRODUCT', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async updateProduct({ commit, dispatch }, productIDToModify) {   
        axios.put(`http://127.0.0.1:8000/api/product/${productIDToModify.value.product_id}`, productIDToModify)
        .then(response => {
            const urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
            }
            dispatch('getProducts', urlToSend)
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async searchProductAction({ commit, dispatch }, productKeyword) {
        if (productKeyword == '') {
            const urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
            }
            dispatch('getProducts', urlToSend)
        }
        else {
            axios.get(`http://127.0.0.1:8000/api/product/search/${productKeyword}`)
                .then(response => {
                    commit('PRODUCTS_INFO', response.data);
                }).catch(error => {
                    commit('SET_MSG',  error.response.data.errors)
            });
        }
     
    },

    async addProduct({ commit, dispatch }, product) {
        axios.post(`http://127.0.0.1:8000/api/product`, product)
        .then(response => {
            const urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
            }
            dispatch('getProducts', urlToSend)
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async removeProduct({commit, dispatch}, productID) {
        axios.delete(`http://127.0.0.1:8000/api/product/${productID}`)
        .then(response => {
            const urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
            }
            dispatch('getProducts', urlToSend)
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    clearMessage({ commit }) {
        commit('SET_MSG', null)
    } 

};

const mutations = {
    PRODUCTS_INFO: (state, response) => (state.productsList = response),
    SPECIFIC_PRODUCT: (state, response) => (state.specificProduct = response),
    SET_MSG: (state, response) => (state.message = response),
};

export default {
    state,
    getters,
    actions,
    mutations
}