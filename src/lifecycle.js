

export function initLifeCycle(Vue) {
    Vue.prototype._update = function() {

    }

    Vue.prototype._render = function() {
        
    }
}


export function mountComponent(vm,el) {
    vm._update(vm._render())
}