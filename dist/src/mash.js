var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('./base');
var mashStep_1 = require('./mashStep');
var util_1 = require('./util');
/**
 * A mash profile, which contains information about a mash along with a list
 * of steps to be taken.
 */
var Mash = (function (_super) {
    __extends(Mash, _super);
    function Mash(options) {
        _super.call(this, options);
        // Set default mash step list to a new empty list
        this.steps = [];
    }
    /** Convert to JSON, storing only values that cannot be easily computed */
    Mash.prototype.toJSON = function () {
        return JSON.stringify({
            name: this.name,
            grainTemp: this.grainTemp,
            spargeTemp: this.spargeTemp,
            ph: this.ph,
            notes: this.notes,
            steps: this.steps
        });
    };
    /** Temperature of the grain in degrees F */
    Mash.prototype.grainTempF = function () {
        return util_1.Utils.cToF(this.grainTemp);
    };
    Mash.prototype.spargeTempF = function () {
        return util_1.Utils.cToF(this.spargeTemp);
    };
    /** Shortcut to add a step to the mash */
    Mash.prototype.addStep = function (options) {
        return this.steps.push(new mashStep_1.MashStep(options));
    };
    return Mash;
})(base_1.OptionConstructor);
exports.Mash = Mash;
//# sourceMappingURL=mash.js.map