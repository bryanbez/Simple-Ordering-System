"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _products = _interopRequireDefault(require("./admin/products"));

var _categories = _interopRequireDefault(require("./admin/categories"));

var _archives = _interopRequireDefault(require("./admin/archives"));

var _loginAndLogout = _interopRequireDefault(require("./loginAndLogout"));

var _register = _interopRequireDefault(require("./register"));

var _cart = _interopRequireDefault(require("./user/cart"));

var _checkout = _interopRequireDefault(require("./user/checkout"));

var _profile = _interopRequireDefault(require("./user/profile"));

var _courier = _interopRequireDefault(require("./admin/courier"));

var _order = _interopRequireDefault(require("./user/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _vuex.createStore)({
  modules: {
    'products': _products["default"],
    'categories': _categories["default"],
    'archives': _archives["default"],
    'loginAndlogout': _loginAndLogout["default"],
    'register': _register["default"],
    'cart': _cart["default"],
    'checkout': _checkout["default"],
    'profile': _profile["default"],
    'courier': _courier["default"],
    'order': _order["default"]
  }
});

exports["default"] = _default;