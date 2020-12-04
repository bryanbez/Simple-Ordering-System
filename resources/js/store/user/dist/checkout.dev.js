"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  checkoutList: [],
  subtotal: 0,
  deliveryFee: 0,
  total_payment: 0,
  enableButtonPlaceOrder: true
};
var getters = {};
var actions = {
  putCartListToCheckoutList: function putCartListToCheckoutList(_ref, checkoutList) {
    var commit = _ref.commit;
    commit('SET_CHECKOUT_LIST', checkoutList);
  },
  setSubTotalAction: function setSubTotalAction(_ref2, subtotal) {
    var commit = _ref2.commit;
    commit('SET_SUBTOTAL', subtotal);
    commit('SET_TOTAL_PAYMENT');
  },
  setCourierChoiceAction: function setCourierChoiceAction(_ref3, courier_id) {
    var commit, dispatch;
    return regeneratorRuntime.async(function setCourierChoiceAction$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref3.commit, dispatch = _ref3.dispatch;

            _axios["default"].get("http://127.0.0.1:8000/api/courier/".concat(courier_id)).then(function (response) {
              commit('SET_BUTTON_PLACE_ORER', false);
              commit('SET_DELIVERY_FEE', response.data.courier_base_price);
              commit('SET_TOTAL_PAYMENT');
            }).then(function (error) {//commit('SET_COURIER_MSG', error)
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  listAllOrderDetailsToCheckout: function listAllOrderDetailsToCheckout(_ref4, orderDetails) {
    var commit = _ref4.commit;

    _axios["default"].post("http://127.0.0.1:8000/api/order/", orderDetails).then(function (response) {
      console.log(response.data);
    }).then(function (error) {//commit('SET_COURIER_MSG', error)
    });
  }
};
var mutations = {
  SET_CHECKOUT_LIST: function SET_CHECKOUT_LIST(state, response) {
    return state.checkoutList = response;
  },
  SET_SUBTOTAL: function SET_SUBTOTAL(state, response) {
    return state.subtotal = response;
  },
  SET_BUTTON_PLACE_ORER: function SET_BUTTON_PLACE_ORER(state, response) {
    return state.enableButtonPlaceOrder = response;
  },
  SET_DELIVERY_FEE: function SET_DELIVERY_FEE(state, delivery_fee) {
    state.deliveryFee = delivery_fee;
  },
  SET_TOTAL_PAYMENT: function SET_TOTAL_PAYMENT(state) {
    if (state.deliveryFee == 0) {
      state.total_payment = state.subtotal;
    }

    state.total_payment = state.subtotal + state.deliveryFee;
    return state.total_payment;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;