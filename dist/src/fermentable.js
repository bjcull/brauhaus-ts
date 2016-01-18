var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ingredient_1 = require('./ingredient');
var util_1 = require('./util');
/**
 * A fermentable ingredient, e.g. liquid malt extract. Each ingredient
 * has a name, weight in kilograms, yield as a percentage, color in
 * degrees SRM, and is marked as either late or normal. Late additions
 * affect hop utilization. Each fermentable also provides methods for
 * getting the type, addition, color name, and gravity units per volume
 * of liquid.
 */
var Fermentable = (function (_super) {
    __extends(Fermentable, _super);
    function Fermentable(fermentable) {
        _super.call(this, fermentable);
    }
    /** Convert to JSON, storing only values that cannot be easily computed */
    Fermentable.prototype.toJSON = function () {
        return JSON.stringify({
            name: this.name,
            weight: this.weight,
            yield: this.yield,
            color: this.color,
            late: this.late
        });
    };
    /** Get the type of fermentable based on its name, either extract
     *  or grain (steeping / mashing)
     */
    Fermentable.prototype.type = function () {
        return this.nameRegexPickerArray([
            { regex: Fermentable.BOIL, value: 'extract' },
            { regex: /.*/, value: 'grain' }
        ]);
    };
    /** When is this item added in the brewing process? Boil, steep, or mash? */
    Fermentable.prototype.addition = function () {
        return this.nameRegexPickerArray([
            // Forced values take precedence, then search known names and
            // default to mashing
            { regex: /mash/i, value: 'mash' },
            { regex: /steep/i, value: 'steep' },
            { regex: /boil/i, value: 'boil' },
            { regex: Fermentable.BOIL, value: 'boil' },
            { regex: Fermentable.STEEP, value: 'steep' },
            { regex: /.*/, value: 'mash' }
        ]);
    };
    /** Get the weight in pounds */
    Fermentable.prototype.weightLb = function () {
        return util_1.Utils.kgToLb(this.weight);
    };
    /** Get the weight in pounds and ounces */
    Fermentable.prototype.weightLbOz = function () {
        return util_1.Utils.kgToLbOz(this.weight);
    };
    /** Get the parts per gallon for this fermentable */
    Fermentable.prototype.ppg = function () {
        return util_1.Utils.yieldToPpg(this.yield);
    };
    /** Get the gravity for a specific liquid volume with 100% efficiency in degrees plato */
    Fermentable.prototype.plato = function (liters) {
        if (liters === void 0) { liters = 1.0; }
        return 259 - (259 / (1.0 + this.gu(liters) / 1000));
    };
    /** Get the gravity units for a specific liquid volume with 100% efficiency */
    Fermentable.prototype.gu = function (liters) {
        if (liters === void 0) { liters = 1.0; }
        // gu = parts per gallon * weight in pounds / gallons
        return this.ppg() * this.weightLb() / util_1.Utils.litersToGallons(liters);
    };
    /** Get a rgb triplet for this fermentable's color */
    Fermentable.prototype.colorRgb = function () {
        return util_1.Utils.srmToRgb(this.color);
    };
    /** Get a CSS-friendly string for this fermentable's color */
    Fermentable.prototype.colorCss = function () {
        return util_1.Utils.srmToCss(this.color);
    };
    /** Get a friendly human-readable color name */
    Fermentable.prototype.colorName = function () {
        return util_1.Utils.srmToName(this.color);
    };
    /** Get the price for this fermentable in USD */
    Fermentable.prototype.price = function () {
        var pricePerKg = this.nameRegexPickerArray([
            { regex: /dry|dme/i, value: 8.80 },
            { regex: /liquid|lme/i, value: 6.60 },
            { regex: /.*/i, value: 4.40 }
        ]);
        return this.weight * pricePerKg;
    };
    /** Regular expressions to match for steeping grains, such as caramel malts.
     *  This is used to create the recipe timeline.
     */
    Fermentable.STEEP = /biscuit|black|cara|chocolate|crystal|munich|roast|special ?b|toast|victory|vienna/i;
    /** Regular expressions to match for boiling sugars (DME, LME, etc).
     *  This is used to create the recipe timeline.
     */
    Fermentable.BOIL = /candi|candy|dme|dry|extract|honey|lme|liquid|sugar|syrup|turbinado/i;
    return Fermentable;
})(ingredient_1.Ingredient);
exports.Fermentable = Fermentable;
//# sourceMappingURL=fermentable.js.map