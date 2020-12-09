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
  fetchOrderTrackListInStaff: function fetchOrderTrackListInStaff(_ref) {
    var commit;
    return regeneratorRuntime.async(function fetchOrderTrackListInStaff$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            _axios["default"].get('http://127.0.0.1:8000/api/user_of_app/');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  fetchOrderTrackListInCourier: function fetchOrderTrackListInCourier(_ref2) {
    var commit;
    return regeneratorRuntime.async(function fetchOrderTrackListInCourier$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;

            _axios["default"].get('');

          case 2:
          case "end":
            return _context2.stop();
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