import axios from 'axios';

const state = {
    categoryList: [],
    message: null,
    categoryToEdit: []
};

const getters = {


};

const actions = {
    async fetchCategories({ commit }) {
        axios.get('http://127.0.0.1:8000/api/category')
        .then(response => {
            commit('CATEGORY_INFO', response.data.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    async createCategory({ commit, dispatch }, category) {
        axios.post('http://127.0.0.1:8000/api/category', category)
        .then(response => {
            dispatch('fetchCategories');
            commit('SET_MSG', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    async fetchSpecificCategory({ commit }, category_id) {
        axios.get(`http://127.0.0.1:8000/api/category/${category_id}`)
        .then(response => {
            commit('SPECIFIC_CATEGORY', response.data);
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    async updateCategory({ commit, dispatch }, category) {
        axios.put(`http://127.0.0.1:8000/api/category/${category.category_id}`, category)
        .then(response => {
            commit('SET_MSG', response.data);
            dispatch('fetchCategories');
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    async removeCategory({ commit, dispatch }, category_id) {
        axios.delete(`http://127.0.0.1:8000/api/category/${category_id}`)
        .then(response => {
            commit('SET_MSG', response.data);
            dispatch('fetchCategories');
        }).catch(error => {
            commit('SET_MSG',  error.response.data.errors)
        });
    },
    clearMessageBox({ commit }) {
        commit('SET_MSG', null)
    } 
};

const mutations = {
    CATEGORY_INFO: (state, response) => (state.categoryList = response),
    SPECIFIC_CATEGORY: (state, response) => (state.categoryToEdit = response),
    SET_MSG: (state, response) => (state.message = response)
};

export default {
    state,
    getters,
    actions,
    mutations
}