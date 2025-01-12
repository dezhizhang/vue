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
            nextTick(flushSchedulerQueue);
            pending = true;
        }
    }
}

let callbacks = [];
let waiting = false;

function flushCallbacks() {
    let cbs = callbacks.slice(0);
    waiting = false;
    callbacks = [];
    cbs.forEach(cb => cb());
}


function nextTick(cb) {
    callbacks.push(cb);
    if(!waiting) {
        setTimeout(() => {
            flushCallbacks();
        },0)
    }
}


export default Watcher;
