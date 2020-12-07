"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  orderList: [],
  orderErrorMessage: []
};
var getters = {};
var actions = {
  fetchAllOrders: function fetchAllOrders(_ref) {
    var commit = _ref.commit;

    _axios["default"].get("http://127.0.0.1:8000/api/order/".concat(JSON.parse(localStorage.getItem('user_id')))).then(function (response) {
      commit('PUT_ORDER_LIST', response.data);
    }).then(function (error) {
      commit('SET_ORDER_ERROR_MSG', error);
    });
  }
};
var mutations = {
  PUT_ORDER_LIST: function PUT_ORDER_LIST(state, response) {
    return state.orderList = response;
  },
  SET_ORDER_ERROR_MSG: function SET_ORDER_ERROR_MSG(state, response) {
    return state.orderErrorMessage = response;
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;