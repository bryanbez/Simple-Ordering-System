"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _Login = _interopRequireDefault(require("../views/Login"));

var _Register = _interopRequireDefault(require("../views/Register"));

var _Homepage = _interopRequireDefault(require("../views/Admin/Homepage"));

var _Products = _interopRequireDefault(require("../views/Admin/Products"));

var _Categories = _interopRequireDefault(require("../views/Admin/Categories"));

var _Archive = _interopRequireDefault(require("../views/Admin/Archive"));

var _Homepage2 = _interopRequireDefault(require("../views/User/Homepage"));

var _ListProductsUser = _interopRequireDefault(require("../components/Products/ListProductsUser"));

var _ViewProduct = _interopRequireDefault(require("../components/Products/ViewProduct"));

var _CartPage = _interopRequireDefault(require("../components/Cart/CartPage"));

var _Checkout = _interopRequireDefault(require("../components/Checkout/Checkout"));

var _Profile = _interopRequireDefault(require("../views/User/Profile"));

var _Courier = _interopRequireDefault(require("../views/Admin/Courier"));

var _OrderPage = _interopRequireDefault(require("../views/User/OrderPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(),
  routes: [{
    path: '/',
    name: 'Login',
    component: _Login["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')) !== '') {
        if (JSON.parse(localStorage.getItem('username')) === 'admin') {
          next({
            name: 'AdminHome'
          });
        } else {
          next({
            name: 'UserHome'
          });
        }
      } else {
        next();
      }
    }
  }, {
    path: '/registeruser',
    name: 'Register',
    component: _Register["default"]
  }, {
    path: '/admin/dashboard',
    name: 'AdminHome',
    component: _Homepage["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/products',
    name: 'Products',
    component: _Products["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/categories',
    name: 'Categories',
    component: _Categories["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/archive',
    name: 'Archives',
    component: _Archive["default"]
  }, {
    path: '/user/dashboard',
    name: 'UserHome',
    component: _Homepage2["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/productlist',
    name: 'ProductsUser',
    component: _ListProductsUser["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/product/:product_id',
    name: 'ViewProduct',
    component: _ViewProduct["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/cart',
    name: 'CartPage',
    component: _CartPage["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/checkout',
    name: 'Checkout',
    component: _Checkout["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/profile',
    name: 'Profile',
    component: _Profile["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/courier',
    name: 'Courier',
    component: _Courier["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({
        name: 'Login'
      });else next();
    }
  }, {
    path: '/order',
    name: 'Order',
    component: _OrderPage["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({
        name: 'Login'
      });else next();
    }
  } // {
  //     path: '*'
  // }
  ]
});
var _default = router;
exports["default"] = _default;