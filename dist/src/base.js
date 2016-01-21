var guidService_1 = require('./guidService');
/** A base class which sets passed options as properties on itself. */
var OptionConstructor = (function () {
    function OptionConstructor(options) {
        this.id = new guidService_1.GuidService().new();
        // Convert JSON strings to objects
        if (typeof (options) == 'string') {
            options = JSON.parse(options);
        }
        this._paramMap = this._paramMap || {};
        // Set any properties passed in
        var keys = Object.keys(this._paramMap);
        for (var property in options) {
            // Is this a property that requires a constructor?
            if (keys.indexOf(property) != -1) {
                // Don't construct null values
                if (options[property] == null) {
                    continue;
                }
                // Is the property an arrary or a single object?
                if (options[property] instanceof Array) {
                    // Set the property to a mapped array, calling the
                    // constructor method to instantiate new objects
                    // if they are not already instances
                    this[property] = this[property] || [];
                    for (var a = 0; a < options[property].length; a++) {
                        var item = options[property][a];
                        if (item instanceof this._paramMap[property]) {
                            this[property].push(item);
                        }
                        else {
                            this[property].push(new this._paramMap[property](item));
                        }
                    }
                }
                else {
                    // Set the property to an instance of the constructor
                    if (options[property] instanceof this._paramMap[property]) {
                        this[property] = options[property];
                    }
                    else {
                        this[property] = new this._paramMap[property](options[property]);
                    }
                }
            }
            else {
                this[property] = options[property];
            }
        }
    }
    return OptionConstructor;
})();
exports.OptionConstructor = OptionConstructor;
//# sourceMappingURL=base.js.map