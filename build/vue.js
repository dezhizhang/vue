(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options; // 初始化状态

        initState(vm);
      };
    }

    function initState(vm) {
      // 获取所有的选项
      var opt = vm.$options;

      if (opt.data) {
        initData(vm);
      }
    }

    function initData(vm) {
      var data = vm.$options.data;
      debugger;
      data = typeof data === 'function' ? data.call(vm) : data;
      console.log('data', data);
    }

    function Vue() {}

    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
