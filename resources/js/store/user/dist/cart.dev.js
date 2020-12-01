"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  cartMessage: '',
  errorResponse: '',
  cartCount: '',
  cartList: [],
  specificCartInfo: [],
  total_price: '',
  cartRemoveMsg: ''
};
var getters = {
  totalPriceToCheckout: function totalPriceToCheckout(state) {
    var totalPriceInCart = 0;

    if (state.cartList == 'null') {
      return 0;
    } else {
      state.cartList.forEach(function (value, index) {
        totalPriceInCart = totalPriceInCart + value['total_price'];
      });
      return totalPriceInCart;
    }
  }
};
var actions = {
  getCartItems: function getCartItems(_ref) {
    var commit;
    return regeneratorRuntime.async(function getCartItems$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            _axios["default"].get("http://127.0.0.1:8000/api/cart/".concat(JSON.parse(localStorage.getItem('user_id')))).then(function (response) {
              commit('CART_LIST', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  addToCartAction: function addToCartAction(_ref2, cartInfo) {
    var commit, dispatch;
    return regeneratorRuntime.async(function addToCartAction$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, dispatch = _ref2.dispatch;

            _axios["default"].post("http://127.0.0.1:8000/api/cart/", cartInfo).then(function (response) {
              dispatch('getCartItems');
              dispatch('getCartItemsCount');
              commit('CART_MESSAGE', response.data);
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
  getCartItemsCount: function getCartItemsCount(_ref3) {
    var commit;
    return regeneratorRuntime.async(function getCartItemsCount$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;

            _axios["default"].get("http://127.0.0.1:8000/api/cart/count/".concat(JSON.parse(localStorage.getItem('user_id')))).then(function (response) {
              commit('CART_COUNT', response.data);
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
  getSpecificCartItemInfo: function getSpecificCartItemInfo(_ref4, cart_id) {
    var commit;
    return regeneratorRuntime.async(function getSpecificCartItemInfo$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit;

            _axios["default"].get("http://127.0.0.1:8000/api/cart/info/".concat(cart_id)).then(function (response) {
              commit('ITEM_INFO', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  changeQty: function changeQty(_ref5, quantityAndPrice) {
    var commit;
    return regeneratorRuntime.async(function changeQty$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            commit = _ref5.commit;
            state.total_price = quantityAndPrice.price * quantityAndPrice.quantity;
            commit('CHANGE_TOTAL_PRICE', state.total_price);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  changeQuantityAndPriceOfCartItem: function changeQuantityAndPriceOfCartItem(_ref6) {
    var commit, dispatch;
    return regeneratorRuntime.async(function changeQuantityAndPriceOfCartItem$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            commit = _ref6.commit, dispatch = _ref6.dispatch;

            _axios["default"].put("http://127.0.0.1:8000/api/cart/info/".concat(state.specificCartInfo.cart_id), state.specificCartInfo).then(function (response) {
              commit('CHANGE_QTY_AND_PRICE_INFO', response.data);
              dispatch('getCartItems');
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  clearCartMessageAction: function clearCartMessageAction(_ref7) {
    var commit;
    return regeneratorRuntime.async(function clearCartMessageAction$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            commit = _ref7.commit;
            commit('CLEAR_CART_MESSAGE', '');

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  removeCartItem: function removeCartItem(_ref8, cart_id) {
    var commit, dispatch;
    return regeneratorRuntime.async(function removeCartItem$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            commit = _ref8.commit, dispatch = _ref8.dispatch;

            _axios["default"]["delete"]("http://127.0.0.1:8000/api/cart/".concat(cart_id)).then(function (response) {
              commit('CART_REMOVE_MESSAGE', response.data);
              dispatch('getCartItems');
              dispatch('getCartItemsCount');
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  clearCartRemoveMessageAction: function clearCartRemoveMessageAction(_ref9) {
    var commit;
    return regeneratorRuntime.async(function clearCartRemoveMessageAction$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            commit = _ref9.commit;
            commit('CART_REMOVE_MESSAGE', '');

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    });
  }
};
var mutations = {
  CART_MESSAGE: function CART_MESSAGE(state, response) {
    return state.cartMessage = response;
  },
  SET_MSG: function SET_MSG(state, response) {
    return state.errorResponse = response;
  },
  CART_COUNT: function CART_COUNT(state, response) {
    return state.cartCount = response;
  },
  CART_LIST: function CART_LIST(state, response) {
    return state.cartList = response;
  },
  ITEM_INFO: function ITEM_INFO(state, response) {
    return state.specificCartInfo = response;
  },
  CHANGE_QTY_AND_PRICE_INFO: function CHANGE_QTY_AND_PRICE_INFO(state, response) {
    return state.cartMessage = response;
  },
  CHANGE_TOTAL_PRICE: function CHANGE_TOTAL_PRICE(state, response) {
    return state.specificCartInfo.total_price = response;
  },
  CLEAR_CART_MESSAGE: function CLEAR_CART_MESSAGE(state, response) {
    return state.cartMessage = '';
  },
  CART_REMOVE_MESSAGE: function CART_REMOVE_MESSAGE(state, response) {
    return state.cartRemoveMsg = response;
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;