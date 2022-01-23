let id = 0;
class Dep{
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    depend() {
        this.subs.push(Dep.target);
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }


}

Dep.target = null;

export default Dep;
