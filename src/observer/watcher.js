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
        queueWatcher(this);
    }
    run() {
        this.get();
    }
}

let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue() {
    let flushQueue = queue.slice(0);
    queue = [];
    has = {};
    pending = false;
    flushQueue.forEach(q => q.run());
}

function queueWatcher(watcher) {
    const id = watcher.id;
    if(!has[id]) {
        queue.push(watcher);
        has[id] = true;
        if(!pending) {
            setTimeout(flushSchedulerQueue,0);
            pending = true;
        }
    }
}


export default Watcher;
