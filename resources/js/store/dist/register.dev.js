"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  errorOnInputMessage: [],
  login_message: []
};
var getters = {};
var actions = {
  registerUserAction: function registerUserAction(_ref, registerInfo) {
    var commit, dispatch;
    return regeneratorRuntime.async(function registerUserAction$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, dispatch = _ref.dispatch;

            _axios["default"].get('/sanctum/csrf-cookie').then(function (response) {
              _axios["default"].post('/register', registerInfo).then(function (response) {
                //localStorage.setItem('username', JSON.stringify(registerInfo.name));
                _axios["default"].post('/logout').then(function (response) {
                  localStorage.setItem('username', JSON.stringify(''));
                  localStorage.setItem('user_id', JSON.stringify(''));

                  _router["default"].push('/');

                  commit('SET_GO_TO_LOGIN_PAGE', 'User created. Please login');
                });
              })["catch"](function (error) {
                commit('SET_ERROR_MSG', error.response.data.errors);
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var mutations = {
  SET_ERROR_MSG: function SET_ERROR_MSG(state, err) {
    return state.errorOnInputMessage = err;
  },
  SET_GO_TO_LOGIN_PAGE: function SET_GO_TO_LOGIN_PAGE(state, response) {
    return state.login_message = response;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;