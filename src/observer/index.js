
import { newArrayProto } from './array';
import Dep from './dep';
class Observer {
    constructor(data) {
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false,
        });
        if (Array.isArray(data)) {
            data.__proto__ = newArrayProto;
            this.observeArray(data);
        } else {
            this.walk(data);
        }

    }

    walk(target) {
        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key]);
        })
    }
    observeArray(data) {
        data.forEach(item => observe(item))
    }
}

function defineReactive(target, key, value) {
    observe(value);
    let dep = new Dep();

    Object.defineProperty(target, key, {
        get() {
            if(Dep.target) {
                dep.depend();
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newValue);
            value = newValue;
            dep.notify();
        }
    })
}

export function observe(data) {
    if (typeof data !== 'object' || data == null) {
        return; // 不是对像不能观测
    }
    if (data._ob_ instanceof Observer) {
        return data._ob_;
    }
    return new Observer(data);
}