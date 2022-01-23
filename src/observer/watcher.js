import Dep from "./dep";


let id = 0;

class Watcher{
    constructor(vm,fn,options) {
        this.id = id++;
        this.renderWatcher = options;
        this.getter = fn;
        this.deps = [];
        this.depsId = new Set();
        this.get();
    }

    addDep(dep) {
        let id = dep.id;
        if(this.depsId.has(id)) {
            this.deps.push(dep);
            this.depsId.add(id);
            dep.addSub(this)
        }
    }

    get() {
        Dep.target = this;
        this.getter();
        Dep.target = null;
    }

    update() {
        this.get();
    }
}


export default Watcher;
