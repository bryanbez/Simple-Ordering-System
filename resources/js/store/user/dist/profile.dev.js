"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  profileOfUser: [],
  updateProfileMsg: []
};
var getters = {};
var actions = {
  addProfile: function addProfile(_ref, user_info) {
    var commit;
    return regeneratorRuntime.async(function addProfile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            _axios["default"].post("http://127.0.0.1:8000/api/profile", user_info).then(function (response) {
              console.log(response.data);
            })["catch"](function (error) {
              console.log(error.response.data.errors);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  fetchProfile: function fetchProfile(_ref2) {
    var commit;
    return regeneratorRuntime.async(function fetchProfile$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;

            _axios["default"].get("http://127.0.0.1:8000/api/profile/".concat(JSON.parse(localStorage.getItem('user_id')))).then(function (response) {
              commit('PUT_PROFILE_INFO', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  updateProfileAction: function updateProfileAction(_ref3, profileInfo) {
    var commit, dispatch;
    return regeneratorRuntime.async(function updateProfileAction$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit, dispatch = _ref3.dispatch;

            _axios["default"].put("http://127.0.0.1:8000/api/profile/".concat(JSON.parse(localStorage.getItem('user_id'))), profileInfo).then(function (response) {
              dispatch('fetchProfile');
              commit('UPDATE_PROFILE_MSG', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  saveUserIDToAddress: function saveUserIDToAddress(_ref4, user_info) {
    var commit;
    return regeneratorRuntime.async(function saveUserIDToAddress$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit;

            _axios["default"].post("http://127.0.0.1:8000/api/address", user_info).then(function (response) {
              console.log(response.data);
            })["catch"](function (error) {
              console.log(error.response.data.errors);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};
var mutations = {
  PUT_PROFILE_INFO: function PUT_PROFILE_INFO(state, response) {
    return state.profileOfUser = response;
  },
  UPDATE_PROFILE_MSG: function UPDATE_PROFILE_MSG(state, response) {
    return state.updateProfileMsg = response;
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