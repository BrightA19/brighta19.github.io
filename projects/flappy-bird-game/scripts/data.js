function DataManager() {
    this.get = function (name) {
        return this[name];
    };
    this.set = function (name, value) {
        this[name] = value;
    };
};
