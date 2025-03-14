(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/confirm_order/confirm_order"],{

/***/ 104:
/*!****************************************************************************************************!*\
  !*** D:/MilkTeaProject/milkteawxprogram/main.js?{"page":"subpkg%2Fconfirm_order%2Fconfirm_order"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _confirm_order = _interopRequireDefault(__webpack_require__(/*! ./subpkg/confirm_order/confirm_order.vue */ 105));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_confirm_order.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 105:
/*!*********************************************************************************!*\
  !*** D:/MilkTeaProject/milkteawxprogram/subpkg/confirm_order/confirm_order.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirm_order.vue?vue&type=template&id=188067cc& */ 106);
/* harmony import */ var _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirm_order.vue?vue&type=script&lang=js& */ 108);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/confirm_order/confirm_order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 106:
/*!****************************************************************************************************************!*\
  !*** D:/MilkTeaProject/milkteawxprogram/subpkg/confirm_order/confirm_order.vue?vue&type=template&id=188067cc& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirm_order.vue?vue&type=template&id=188067cc& */ 107);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_188067cc___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 107:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/MilkTeaProject/milkteawxprogram/subpkg/confirm_order/confirm_order.vue?vue&type=template&id=188067cc& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 108:
/*!**********************************************************************************************************!*\
  !*** D:/MilkTeaProject/milkteawxprogram/subpkg/confirm_order/confirm_order.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.36.2024112817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirm_order.vue?vue&type=script&lang=js& */ 109);
/* harmony import */ var _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_36_2024112817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 109:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/MilkTeaProject/milkteawxprogram/subpkg/confirm_order/confirm_order.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 43));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 45));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _OrderRequest = __webpack_require__(/*! @/api/OrderRequest */ 83);
var _vuex = __webpack_require__(/*! vuex */ 34);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DeliveryAddress = function DeliveryAddress() {
  __webpack_require__.e(/*! require.ensure | components/order/DeliveryAddress */ "components/order/DeliveryAddress").then((function () {
    return resolve(__webpack_require__(/*! @/components/order/DeliveryAddress.vue */ 156));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var ProductList = function ProductList() {
  __webpack_require__.e(/*! require.ensure | components/order/ProductList */ "components/order/ProductList").then((function () {
    return resolve(__webpack_require__(/*! @/components/order/ProductList.vue */ 163));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var PaymentMethod = function PaymentMethod() {
  __webpack_require__.e(/*! require.ensure | components/order/PaymentMethod */ "components/order/PaymentMethod").then((function () {
    return resolve(__webpack_require__(/*! @/components/order/PaymentMethod.vue */ 170));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var OrderFooter = function OrderFooter() {
  __webpack_require__.e(/*! require.ensure | components/order/OrderFooter */ "components/order/OrderFooter").then((function () {
    return resolve(__webpack_require__(/*! @/components/order/OrderFooter.vue */ 177));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    DeliveryAddress: DeliveryAddress,
    ProductList: ProductList,
    PaymentMethod: PaymentMethod,
    OrderFooter: OrderFooter
  },
  data: function data() {
    return {
      remark: '',
      // 购物车数据
      cartProducts: [],
      discount: 0,
      totalPrice: 0,
      // 微信收货地址
      wxAddress: null
    };
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['userInfo'])), (0, _vuex.mapGetters)('m_cart', ['selectedCartList'])),
  onLoad: function onLoad(options) {
    // 获取状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    // 判断是否登录
    var token = uni.getStorageSync('token');
    if (!token) {
      uni.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        success: function success() {
          uni.switchTab({
            url: '/pages/my/my'
          });
        }
      });
      return;
    }
    // 从购物车获取商品列表
    this.getCartProducts();
    // 尝试从本地存储加载上次选择的地址
    try {
      var savedAddress = uni.getStorageSync('lastSelectedAddress');
      if (savedAddress) {
        this.wxAddress = JSON.parse(savedAddress);
      }
    } catch (e) {
      console.error('加载地址失败', e);
    }
  },
  methods: {
    // 处理地址选择
    handleAddressSelected: function handleAddressSelected(address) {
      // 更新微信地址
      this.wxAddress = address;
      // 保存地址到本地存储
      uni.setStorageSync('lastSelectedAddress', JSON.stringify(address));
    },
    // 格式化规格信息为可读字符串
    formatSpecs: function formatSpecs(specs) {
      if (!specs) return '';
      var validSpecs = Object.entries(specs).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return value && value.trim() !== '';
      }).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        var typeText = key;
        switch (key) {
          case 'size':
            typeText = '杯型';
            break;
          case 'sugar':
            typeText = '糖度';
            break;
          case 'temperature':
            typeText = '温度';
            break;
          case 'addon':
            typeText = '加料';
            break;
        }
        return "".concat(typeText, ": ").concat(value);
      });
      return validSpecs.join(' | ');
    },
    // 获取购物车商品
    getCartProducts: function getCartProducts() {
      var _this = this;
      var selectedProducts = this.selectedCartList;
      this.cartProducts = selectedProducts.map(function (item) {
        return {
          id: item.id,
          name: item.name,
          specification: _this.formatSpecs(item.specs),
          specs: item.specs,
          price: item.price,
          originalPrice: item.originalPrice || null,
          count: item.quantity,
          image: item.image,
          isSpecial: item.isSpecial || false
        };
      });
      this.calculateTotal();
    },
    // 计算总价
    calculateTotal: function calculateTotal() {
      var total = 0;
      var originalTotal = 0;
      this.cartProducts.forEach(function (item) {
        total += item.price * item.count;
        if (item.originalPrice) {
          originalTotal += item.originalPrice * item.count;
        } else {
          originalTotal += item.price * item.count;
        }
      });
      this.totalPrice = total.toFixed(1);
      this.discount = (originalTotal - total).toFixed(1);
      if (this.discount <= 0) {
        this.discount = 0;
      }
    },
    // 显示备注弹窗
    showRemarkPopup: function showRemarkPopup() {
      var _this2 = this;
      uni.showModal({
        title: '添加备注',
        content: '',
        editable: true,
        placeholderText: '请输入特殊要求: 如少糖、少冰等',
        success: function success(res) {
          if (res.confirm && res.content) {
            _this2.remark = res.content;
          }
        }
      });
    },
    // 提交订单
    submitOrder: function submitOrder() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var orderData, result;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this3.userInfo) {
                  _context2.next = 4;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                setTimeout(function () {
                  uni.switchTab({
                    url: '/pages/my/my'
                  });
                }, 1500);
                return _context2.abrupt("return");
              case 4:
                if (_this3.wxAddress) {
                  _context2.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请选择收货地址',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 7:
                orderData = {
                  items: _this3.cartProducts.map(function (item) {
                    return {
                      productId: item.id,
                      quantity: item.count,
                      specs: item.specs
                    };
                  }),
                  deliveryAddress: '',
                  paymentMethod: 'wechat',
                  note: _this3.remark
                };
                if (_this3.wxAddress) {
                  orderData.deliveryAddress = _this3.wxAddress.cityName + _this3.wxAddress.countyName + _this3.wxAddress.detailInfo;
                }
                _context2.prev = 9;
                _context2.next = 12;
                return (0, _OrderRequest.CreateOrderRequest)(orderData);
              case 12:
                result = _context2.sent;
                uni.showModal({
                  title: '温馨提示',
                  content: '你确定要支付吗',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {
                      return _regenerator.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!res.confirm) {
                                _context.next = 7;
                                break;
                              }
                              _context.next = 3;
                              return (0, _OrderRequest.PayOrderRequest)(result.id);
                            case 3:
                              _this3.$store.commit('m_cart/removeSelectedGoods');
                              uni.showToast({
                                title: '支付成功',
                                icon: 'success'
                              });
                              _context.next = 8;
                              break;
                            case 7:
                              if (res.cancel) {
                                uni.showToast({
                                  title: '取消支付',
                                  icon: 'none'
                                });
                              }
                            case 8:
                              // 跳转到订单页面
                              setTimeout(function () {
                                uni.switchTab({
                                  url: '/pages/order/order'
                                });
                              }, 1500);
                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
                _context2.next = 20;
                break;
              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](9);
                console.error(_context2.t0);
                uni.showToast({
                  title: '创建订单失败',
                  icon: 'none'
                });
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 16]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[104,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/confirm_order/confirm_order.js.map