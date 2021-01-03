"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../../router/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
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
  isNameAndAddressProvided: false
};
var getters = {};
var actions = {
  putCartListToCheckoutList: function putCartListToCheckoutList(_ref, checkoutList) {
    var commit = _ref.commit;
    commit('SET_CHECKOUT_LIST', checkoutList);
  },
  setSubTotalAction: function setSubTotalAction(_ref2, subtotal) {
    var commit = _ref2.commit,
        dispatch = _ref2.dispatch;
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
              commit('SET_DELIVERY_FEE', response.data.courier_base_price);
              commit('SET_COURIER_CHOICE', response.data.courier_name);
              commit('SET_TOTAL_PAYMENT');
              dispatch('checkIfPaymentMethodProvide');
            }).then(function (error) {//commit('SET_COURIER_MSG', error)
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  setPaymentMethodAction: function setPaymentMethodAction(_ref4, payment_method) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch;
    commit('SET_PAYMENT_METHOD', payment_method);
    dispatch('checkIfPaymentMethodProvide');
  },
  checkIfNameAndAddressProvide: function checkIfNameAndAddressProvide(_ref5) {
    var commit = _ref5.commit;

    _axios["default"].get("http://127.0.0.1:8000/api/profile/".concat(JSON.parse(localStorage.getItem('user_id')))).then(function (response) {
      if (response.data['address'] == null || response.data['first_name'] == null || response.data['last_name'] == null) {
        commit('IS_NAME_AND_ADDRESS_PROVIDE', false);
      } else {
        commit('IS_NAME_AND_ADDRESS_PROVIDE', true);
      }
    })["catch"](function (error) {//commit('SET_MSG',  error.response.data.errors)
    });
  },
  checkIfPaymentMethodProvide: function checkIfPaymentMethodProvide(_ref6) {
    var commit = _ref6.commit;

    if (state.payment_method != '' && state.isNameAndAddressProvided == true && state.courier_name != '') {
      console.log('Completed');
      commit('SET_BUTTON_PLACE_ORDER', false);
    } else {
      commit('SET_BUTTON_PLACE_ORDER', true);
    }
  },
  listAllOrderDetailsToCheckout: function listAllOrderDetailsToCheckout(_ref7, orderDetails) {
    var commit = _ref7.commit;

    _axios["default"].post("http://127.0.0.1:8000/api/order/", orderDetails).then(function (response) {
      console.log(response.data);

      _index["default"].push('/order');
    }).then(function (error) {//commit('SET_COURIER_MSG', error)
    });
  },
  verifyVoucherAvailability: function verifyVoucherAvailability(_ref8, voucher_info_to_pass) {
    var commit;
    return regeneratorRuntime.async(function verifyVoucherAvailability$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref8.commit;

            _axios["default"].post("http://127.0.0.1:8000/api/voucher/to_use/", voucher_info_to_pass).then(function (response) {
              commit('SET_VOUCHER_AVAIL_MESSAGE', response.data['message']);
              commit('SET_TOTAL_DISCOUNTED_PAYMENT', response.data['discount_price']);
              commit('SET_DEDUCTION_AMOUNT', response.data['deduction']);
            })["catch"](function (error) {
              commit('SET_ERR_MESSAGE', error);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
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
  SET_BUTTON_PLACE_ORDER: function SET_BUTTON_PLACE_ORDER(state, response) {
    return state.enableButtonPlaceOrder = response;
  },
  SET_COURIER_CHOICE: function SET_COURIER_CHOICE(state, response) {
    return state.courier_name = response;
  },
  SET_DELIVERY_FEE: function SET_DELIVERY_FEE(state, delivery_fee) {
    return state.deliveryFee = delivery_fee;
  },
  SET_PAYMENT_METHOD: function SET_PAYMENT_METHOD(state, payment_method) {
    return state.payment_method = payment_method;
  },
  SET_TOTAL_PAYMENT: function SET_TOTAL_PAYMENT(state) {
    if (state.deliveryFee == 0) {
      state.total_payment = state.subtotal;
      state.withoutDiscount = state.subtotal;
    }

    state.total_payment = state.subtotal + state.deliveryFee;
    state.withoutDiscount = state.subtotal + state.deliveryFee;
  },
  SET_TOTAL_DISCOUNTED_PAYMENT: function SET_TOTAL_DISCOUNTED_PAYMENT(state, discounted) {
    if (state.deductionAmount == 0) {
      state.total_payment = state.withoutDiscount;
    }

    state.total_payment = discounted;
  },
  SET_VOUCHER_AVAIL_MESSAGE: function SET_VOUCHER_AVAIL_MESSAGE(state, message) {
    return state.voucherMessage = message;
  },
  SET_DEDUCTION_AMOUNT: function SET_DEDUCTION_AMOUNT(state, deduction) {
    return state.deductionAmount = deduction;
  },
  IS_NAME_AND_ADDRESS_PROVIDE: function IS_NAME_AND_ADDRESS_PROVIDE(state, _boolean) {
    return state.isNameAndAddressProvided = _boolean;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;