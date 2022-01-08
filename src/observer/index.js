
class Observer {
    constructor(value) {
        this.walk(value);
    }

    walk(target) {
        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key]);
        })
    }
}

function defineReactive(target, key, value) {
    observe(value);
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            value = newValue;
        }
    })
}

export function observe(data) {
    if (typeof data !== 'object' || data == null) {
        return; // 不是对像不能观测
    }
    return new Observer(data);
}