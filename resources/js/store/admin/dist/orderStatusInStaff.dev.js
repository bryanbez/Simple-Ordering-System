"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  message: ''
};
var getters = {};
var actions = {
  fetchOrderTrackList: function fetchOrderTrackList(_ref) {
    var commit;
    return regeneratorRuntime.async(function fetchOrderTrackList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            _axios["default"].get('');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var mutations = {
  SET_MSG: function SET_MSG(state, response) {
    return state.message = response;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;