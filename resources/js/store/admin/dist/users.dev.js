"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  message: '',
  userList: [],
  errorOnInput: []
};
var getters = {};
var actions = {
  fetchStaffAndCourier: function fetchStaffAndCourier(_ref) {
    var commit;
    return regeneratorRuntime.async(function fetchStaffAndCourier$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            _axios["default"].get('http://127.0.0.1:8000/api/user_of_app/').then(function (response) {
              commit('SET_USER_LIST', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  saveInfoOfStaffOrCourier: function saveInfoOfStaffOrCourier(_ref2, userInfo) {
    var commit, dispatch;
    return regeneratorRuntime.async(function saveInfoOfStaffOrCourier$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, dispatch = _ref2.dispatch;

            _axios["default"].post('http://127.0.0.1:8000/api/user_of_app/', userInfo).then(function (response) {
              dispatch('fetchStaffAndCourier'); // dispatch('clearSingleUserInfo')

              commit('SET_MSG', response.data);
            })["catch"](function (error) {
              commit('SET_ERR_ON_INPUT', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  clearMessage: function clearMessage(_ref3) {
    var commit = _ref3.commit;
    commit('SET_MSG', '');
  },
  clearInputErrorMsg: function clearInputErrorMsg(_ref4) {
    var commit = _ref4.commit;
    commit('SET_ERR_ON_INPUT', '');
  }
};
var mutations = {
  SET_MSG: function SET_MSG(state, response) {
    return state.message = response;
  },
  SET_USER_LIST: function SET_USER_LIST(state, response) {
    return state.userList = response;
  },
  SET_ERR_ON_INPUT: function SET_ERR_ON_INPUT(state, response) {
    return state.errorOnInput = response;
  } // SET_SINGLE_USER: (state, response) => (state.singleUser = response)

};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;