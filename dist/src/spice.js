var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ingredient_1 = require('./ingredient');
var globals_1 = require('./globals');
var util_1 = require('./util');
/**
 * A spice ingredient, e.g. cascade hops or crushed coriander. Each spice
 * has a weight in kilograms, alpha acid (aa) percentage, use (mash, boil,
 * primary, secondary, etc), time in minutes to add the spice, and the
 * spice's form (whole, leaf, pellet, crushed, ground, etc).
 */
var Spice = (function (_super) {
    __extends(Spice, _super);
    function Spice(spice) {
        _super.call(this, spice);
    }
    /** Convert to JSON, storing only values that cannot be easily computed */
    Spice.prototype.toJSON = function () {
        return {
            name: this.name,
            weight: this.weight,
            aa: this.aa,
            use: this.use,
            time: this.time,
            form: this.form
        };
    };
    /** True if this is an ingredient added after the boil */
    Spice.prototype.dry = function () {
        return Spice.DRY_SPICE.exec(this.use) != null || false;
    };
    /** Account for better utilization from pellets vs. whole */
    Spice.prototype.utilizationFactor = function () {
        return this.form == 'pellet' ? 1.15 : 1.0;
    };
    /** Get the bitterness of this spice */
    Spice.prototype.bitterness = function (ibuMethod, earlyOg, batchSize) {
        // Calculate bitterness based on chosen method
        if (ibuMethod == 'tinseth') {
            return 1.65 * Math.pow(0.000125, earlyOg - 1.0) * ((1 - Math.pow(Math.E, -0.04 * this.time)) / 4.15) * ((this.aa / 100.0 * this.weight * 1000000) / batchSize) * this.utilizationFactor();
        }
        else if (ibuMethod == 'rager') {
            var utilization = 18.11 + 13.86 * globals_1.Globals.tanh((this.time - 31.32) / 18.27);
            var adjustment = Math.max(0, (earlyOg - 1.050) / 0.2);
            return this.weight * 100 * utilization * this.utilizationFactor() * this.aa / (batchSize * (1 + adjustment));
        }
        throw new Error("Unknown IBU method '#{ibuMethod}'!");
    };
    /** Get the weight in pounds */
    Spice.prototype.weightLb = function () {
        return util_1.Utils.kgToLb(this.weight);
    };
    /** Get the weight in pounds and ounces */
    Spice.prototype.weightLbOz = function () {
        return util_1.Utils.kgToLbOz(this.weight);
    };
    /** Get the price for this spice in USD */
    Spice.prototype.price = function () {
        var pricePerKg = this.nameRegexPickerArray([
            { regex: /.*/i, value: 17.64 }
        ]);
        return this.weight * pricePerKg;
    };
    /** Regular expressions to match for dry hopping vs. mash/boil additions */
    Spice.DRY_SPICE = /primary|secondary|dry/i;
    return Spice;
})(ingredient_1.Ingredient);
exports.Spice = Spice;
//# sourceMappingURL=spice.js.map