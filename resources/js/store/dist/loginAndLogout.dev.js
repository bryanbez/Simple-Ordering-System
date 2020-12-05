"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  loginMessage: '',
  loginUsername: '',
  loginUsernameID: ''
};
var getters = {};
var actions = {
  LoginAction: function LoginAction(_ref, loginCredentials) {
    var _this = this;

    var commit, dispatch;
    return regeneratorRuntime.async(function LoginAction$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, dispatch = _ref.dispatch;

            _axios["default"].get('/sanctum/csrf-cookie').then(function (response) {
              _axios["default"].post('/login', loginCredentials).then(function (response) {
                if (response.data.username != 'undefined') {
                  dispatch('profile/addProfile', response.data);
                  dispatch('profile/saveUserIDToAddress', response.data);
                  localStorage.setItem('username', JSON.stringify(response.data.username));
                  localStorage.setItem('user_id', JSON.stringify(response.data.user_id));
                  localStorage.setItem('email', JSON.stringify(response.data.email));
                  commit('SET_USERNAME', JSON.parse(localStorage.getItem('username')));
                  commit('SET_USERNAME_ID', JSON.parse(localStorage.getItem('user_id')));

                  if (response.data.username === 'admin') {
                    _router["default"].push('/admin/dashboard');
                  } else {
                    _router["default"].push({
                      name: 'UserHome'
                    });
                  }
                } else {
                  _this.LogoutAction();

                  return 'Failed To Login. Try Again';
                }
              })["catch"](function (error) {
                commit('SET_MSG', error.response.data.errors);
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  LogoutAction: function LogoutAction(_ref2) {
    var commit, dispatch;
    return regeneratorRuntime.async(function LogoutAction$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, dispatch = _ref2.dispatch;

            _axios["default"].post('/logout').then(function (response) {
              localStorage.setItem('username', JSON.stringify(''));
              localStorage.setItem('user_id', JSON.stringify(''));
              localStorage.setItem('email', JSON.stringify(''));

              _router["default"].push('/'); //dispatch('fetchUserName')


              commit('SET_USERNAME', '');
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
  fetchUserName: function fetchUserName(_ref3) {
    var commit = _ref3.commit;
    commit('SET_USERNAME', JSON.parse(localStorage.getItem('username')));
  }
};
var mutations = {
  SET_MSG: function SET_MSG(state, response) {
    return state.loginMessage = response;
  },
  SET_USERNAME: function SET_USERNAME(state, response) {
    return state.loginUsername = response;
  },
  SET_USERNAME_ID: function SET_USERNAME_ID(state, response) {
    return state.loginUsernameID = response;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;