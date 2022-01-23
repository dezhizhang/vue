import Dep from "./dep";


let id = 0;

class Watcher{
    constructor(vm,fn,options) {
        this.id = id++;
        this.renderWatcher = options;
        this.getter = fn;
        this.get();
    }

    get() {
        Dep.target = this;
        this.getter();
        Dep.target = null;
    }
}