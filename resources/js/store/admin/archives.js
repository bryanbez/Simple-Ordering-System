import axios from 'axios';

const state = {
    archiveProducts: [],
    archiveCategories: [],
    message: null
};

const getters = {


};

const actions = {
    async fetchArchiveProducts({ commit }) {
        axios.get('http://127.0.0.1:8000/api/archive/products')
        .then(response => {
            commit('ARCHIVE_PRODUCTS', response.data.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async restoreProductAction({ commit, dispatch }, productId) {
        axios.put(`http://127.0.0.1:8000/api/archive/restore/product/${productId}`)
        .then(response => {
            dispatch('fetchArchiveProducts');
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async deleteProductAction({ commit }, productId) {
        axios.delete(`http://127.0.0.1:8000/api/archive/delete/product/${productId}`)
        .then(response => {
            dispatch('fetchArchiveProducts');
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async fetchArchiveCategories({ commit }) {
        axios.get('http://127.0.0.1:8000/api/archive/categories')
        .then(response => {
          
            commit('ARCHIVE_CATEGORIES', response.data.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async restoreCategoryAction({ commit, dispatch }, categoryId) {
        axios.put(`http://127.0.0.1:8000/api/archive/restore/category/${categoryId}`)
        .then(response => {
            dispatch('fetchArchiveCategories');
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

    async deleteCategoryAction({ commit }, categoryId) {
        axios.delete(`http://127.0.0.1:8000/api/archive/delete/category/${categoryId}`)
        .then(response => {
            dispatch('fetchArchiveCategories');
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },

};

const mutations = {
    ARCHIVE_PRODUCTS: (state, response) => (state.archiveProducts = response),
    ARCHIVE_CATEGORIES: (state, response) => (state.archiveCategories = response),
    SET_MSG: (state, response) => (state.message = response),
};

export default {
    state,
    getters,
    actions,
    mutations
}