
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {

        const vm = this;
        vm.$options = options;

        // 初始化状态
        initState(vm);
    }
}

function initState(vm) {
    // 获取所有的选项
    const opt = vm.$options;
    if(opt.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm):data;
    console.log('data',data)
}