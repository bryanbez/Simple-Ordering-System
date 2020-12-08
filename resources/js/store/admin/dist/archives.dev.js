"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  archiveProducts: [],
  archiveCategories: [],
  message: null
};
var getters = {};
var actions = {
  fetchArchiveProducts: function fetchArchiveProducts(_ref) {
    var commit;
    return regeneratorRuntime.async(function fetchArchiveProducts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;

            _axios["default"].get('http://127.0.0.1:8000/api/archive/products').then(function (response) {
              commit('ARCHIVE_PRODUCTS', response.data.data);
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
  restoreProductAction: function restoreProductAction(_ref2, productId) {
    var commit, dispatch;
    return regeneratorRuntime.async(function restoreProductAction$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, dispatch = _ref2.dispatch;

            _axios["default"].put("http://127.0.0.1:8000/api/archive/restore/product/".concat(productId)).then(function (response) {
              dispatch('fetchArchiveProducts');
              commit('SET_MSG', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  deleteProductAction: function deleteProductAction(_ref3, productId) {
    var commit, dispatch;
    return regeneratorRuntime.async(function deleteProductAction$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit, dispatch = _ref3.dispatch;

            _axios["default"]["delete"]("http://127.0.0.1:8000/api/archive/delete/product/".concat(productId)).then(function (response) {
              dispatch('fetchArchiveProducts');
              commit('SET_MSG', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error);
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  fetchArchiveCategories: function fetchArchiveCategories(_ref4) {
    var commit;
    return regeneratorRuntime.async(function fetchArchiveCategories$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit;

            _axios["default"].get('http://127.0.0.1:8000/api/archive/categories').then(function (response) {
              console.log(response.data);
              commit('ARCHIVE_CATEGORIES', response.data.data);
            })["catch"](function (error) {
              commit('SET_MSG', error);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  restoreCategoryAction: function restoreCategoryAction(_ref5, categoryId) {
    var commit, dispatch;
    return regeneratorRuntime.async(function restoreCategoryAction$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            commit = _ref5.commit, dispatch = _ref5.dispatch;

            _axios["default"].put("http://127.0.0.1:8000/api/archive/restore/category/".concat(categoryId)).then(function (response) {
              dispatch('fetchArchiveCategories');
              commit('SET_MSG', response.data);
            })["catch"](function (error) {
              commit('SET_MSG', error);
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  deleteCategoryAction: function deleteCategoryAction(_ref6, categoryId) {
    var commit, dispatch;
    return regeneratorRuntime.async(function deleteCategoryAction$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            commit = _ref6.commit, dispatch = _ref6.dispatch;

            _axios["default"]["delete"]("http://127.0.0.1:8000/api/archive/delete/category/".concat(categoryId)).then(function (response) {
              dispatch('fetchArchiveCategories');
              commit('SET_MSG', response);
            })["catch"](function (error) {
              commit('SET_MSG', error);
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  }
};
var mutations = {
  ARCHIVE_PRODUCTS: function ARCHIVE_PRODUCTS(state, response) {
    return state.archiveProducts = response;
  },
  ARCHIVE_CATEGORIES: function ARCHIVE_CATEGORIES(state, response) {
    return state.archiveCategories = response;
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