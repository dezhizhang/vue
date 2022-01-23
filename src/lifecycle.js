
import {createElementVNode,createTextNode} from './vdom/index';

export function initLifeCycle(Vue) {
    Vue.prototype._update = function() {

    }

    Vue.prototype._c = function() {
        return createElementVNode(this,...arguments);
    }

    Vue.prototype._v = function() {
        return createTextNode(this,...arguments);
    }

    Vue.prototype._s = function(value) {
        return JSON.stringify(value);
    }

    Vue.prototype._render = function() {
        const vm = this;
        return this.$options.render.call(this);
    }
}


export function mountComponent(vm,el) {
    vm._update(vm._render())
}