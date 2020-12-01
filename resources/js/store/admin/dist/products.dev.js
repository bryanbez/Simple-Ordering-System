"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  productsList: [],
  specificProduct: [],
  message: null
};
var getters = {};
var actions = {
  getProducts: function getProducts(_ref, urlToSend) {
    var commit;
    return regeneratorRuntime.async(function getProducts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            if (urlToSend.sortBy != '') {
              if (urlToSend.pageURL == '') {
                _axios["default"].get("http://127.0.0.1:8000/api/product?sort=".concat(urlToSend.sortBy)).then(function (response) {
                  commit('PRODUCTS_INFO', response.data);
                })["catch"](function (error) {
                  commit('SET_MSG', error.response.data.errors);
                });
              } else {
                _axios["default"].get("".concat(urlToSend.pageURL, "&sort=").concat(urlToSend.sortBy)).then(function (response) {
                  commit('PRODUCTS_INFO', response.data);
                })["catch"](function (error) {
                  commit('SET_MSG', error.response.data.errors);
                });
              }
            } else {
              if (urlToSend.pageURL) {
                _axios["default"].get(urlToSend.pageURL).then(function (response) {
                  commit('PRODUCTS_INFO', response.data);
                })["catch"](function (error) {
                  commit('SET_MSG', error.response.data.errors);
                });
              } else {
                _axios["default"].get('http://127.0.0.1:8000/api/product').then(function (response) {
                  commit('PRODUCTS_INFO', response.data);
                })["catch"](function (error) {
                  commit('SET_MSG', error.response.data.errors);
                });
              }
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  fetchSpecificProduct: function fetchSpecificProduct(_ref2, product_id) {
    var commit;
    return regeneratorRuntime.async(function fetchSpecificProduct$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;

            _axios["default"].get("http://127.0.0.1:8000/api/product/".concat(product_id)).then(function (response) {
              commit('SPECIFIC_PRODUCT', response.data);
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
  updateProduct: function updateProduct(_ref3, productIDToModify) {
    var commit, dispatch;
    return regeneratorRuntime.async(function updateProduct$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit, dispatch = _ref3.dispatch;

            _axios["default"].put("http://127.0.0.1:8000/api/product/".concat(productIDToModify.value.product_id), productIDToModify).then(function (response) {
              var urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
              };
              dispatch('getProducts', urlToSend);
              commit('SET_MSG', response.data);
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
  searchProductAction: function searchProductAction(_ref4, productKeyword) {
    var commit, dispatch, urlToSend;
    return regeneratorRuntime.async(function searchProductAction$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit, dispatch = _ref4.dispatch;

            if (productKeyword == '') {
              urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
              };
              dispatch('getProducts', urlToSend);
            } else {
              _axios["default"].get("http://127.0.0.1:8000/api/product/search/".concat(productKeyword)).then(function (response) {
                commit('PRODUCTS_INFO', response.data);
              })["catch"](function (error) {
                commit('SET_MSG', error.response.data.errors);
              });
            }

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  addProduct: function addProduct(_ref5, product) {
    var commit, dispatch;
    return regeneratorRuntime.async(function addProduct$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            commit = _ref5.commit, dispatch = _ref5.dispatch;

            _axios["default"].post("http://127.0.0.1:8000/api/product", product).then(function (response) {
              var urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
              };
              dispatch('getProducts', urlToSend);
              commit('SET_MSG', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error.response.data.errors);
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  removeProduct: function removeProduct(_ref6, productID) {
    var commit, dispatch;
    return regeneratorRuntime.async(function removeProduct$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            commit = _ref6.commit, dispatch = _ref6.dispatch;

            _axios["default"]["delete"]("http://127.0.0.1:8000/api/product/".concat(productID)).then(function (response) {
              var urlToSend = {
                pageURL: '',
                sortBy: 'reset_sort'
              };
              dispatch('getProducts', urlToSend);
              commit('SET_MSG', response.data);
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
  clearMessage: function clearMessage(_ref7) {
    var commit = _ref7.commit;
    commit('SET_MSG', null);
  }
};
var mutations = {
  PRODUCTS_INFO: function PRODUCTS_INFO(state, response) {
    return state.productsList = response;
  },
  SPECIFIC_PRODUCT: function SPECIFIC_PRODUCT(state, response) {
    return state.specificProduct = response;
  },
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