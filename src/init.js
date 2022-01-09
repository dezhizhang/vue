import { initState } from './state';
import { compileToFunction } from './compiler/index';

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {

        const vm = this;
        vm.$options = options;

        // 初始化状态
        initState(vm);

        // 初始化模板
        if(options.el) {
            vm.$mount(options.el);
        }
    }

    Vue.prototype.$mount = function(el) {
        const vm = this;
        const opt = vm.$options;
        el = document.querySelector(el);
        if(!opt.render) {
            let template;
            if(!opt.template && el) {
                template = el.outerHTML;
            }else if(el){
                template = opt.template;
            }
            if(template) {
                compileToFunction(template);
            }
            console.log(template);
        }
    }
}

