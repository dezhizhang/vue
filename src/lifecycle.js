
import {createElementVNode,createTextNode} from './vdom/index';


function createElm(vnode) {
    const { tag,data,children,text} = vnode;
    if(typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        patchProps(vnode.el,data);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child));
        })
    }else{
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}

function patchProps(el,props) {
    for(let key in props) {
        if(key ==='style') {
            for(let styleName in props.style) {
                el.style[styleName] = props.style[styleName];
            }
        }else {
            el.setAttribute(key,props[key])
        }
    }
}


function patch(oldVnode,vnode) {
    // 初次渲染
    const isRealElement = oldVnode && oldVnode.nodeType;
    if(isRealElement) {
        const elm = oldVnode;
        const parentElm = elm.parentNode;
        let newElm = createElm(vnode);
        parentElm.insertBefore(newElm,elm.nextSibling);
        parentElm.removeChild(elm);
    }else {
        //diff算法
    }
}

export function initLifeCycle(Vue) {
    Vue.prototype._update = function(vnode) {
       const vm = this;
       const el = vm.$el;
       patch(el,vnode);
       
    }

    Vue.prototype._c = function() {
        return createElementVNode(this,...arguments);
    }

    Vue.prototype._v = function() {
        return createTextNode(this,...arguments);
    }

    Vue.prototype._s = function(value) {
        if(typeof value!=='object') return value;
        return JSON.stringify(value);
    }

    Vue.prototype._render = function() {
        return this.$options.render.call(this);
    }
}

 
export function mountComponent(vm,el) {
    vm.$el = el;
    vm._update(vm._render())
}