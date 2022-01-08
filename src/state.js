
import { observe } from './observer/index';

export function initState(vm) {
    // 获取所有的选项
    const opt = vm.$options;
    if(opt.data) {
        initData(vm)
    }
}

export function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm):data;
    observe(data);
    console.log('data',data)
}