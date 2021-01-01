"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  listVoucher: [],
  message: '',
  errorMessage: ''
};
var getters = {};
var actions = {
  saveVoucher: function saveVoucher(_ref, voucher) {
    var commit, dispatch;
    return regeneratorRuntime.async(function saveVoucher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, dispatch = _ref.dispatch;

            _axios["default"].post('http://127.0.0.1:8000/api/voucher', voucher).then(function (response) {
              commit('SET_SAVE_VOUCHER_MESSAGE', response.data);
            })["catch"](function (error) {
              commit('SET_ERR_MESSAGE', error);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  fetchListOfVoucher: function fetchListOfVoucher(_ref2) {
    var commit;
    return regeneratorRuntime.async(function fetchListOfVoucher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;

            _axios["default"].get('http://127.0.0.1:8000/api/voucher').then(function (response) {
              commit('SET_LIST_VOUCHER', response.data);
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
  SET_LIST_VOUCHER: function SET_LIST_VOUCHER(state, response) {
    return state.listVoucher = response;
  },
  SET_SAVE_VOUCHER_MESSAGE: function SET_SAVE_VOUCHER_MESSAGE(state, message) {
    return state.message = message;
  },
  SET_ERR_MESSAGE: function SET_ERR_MESSAGE(state, error) {
    return state.errorMessage = error;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;