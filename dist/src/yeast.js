var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ingredient_1 = require('./ingredient');
/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
var Yeast = (function (_super) {
    __extends(Yeast, _super);
    function Yeast(yeast) {
        _super.call(this, yeast);
    }
    /** Convert to JSON, storing only values that cannot be easily computed */
    Yeast.prototype.toJSON = function () {
        return {
            name: this.name,
            type: this.type,
            form: this.form,
            attenuation: this.attenuation,
            lab: this.lab,
            code: this.code
        };
    };
    /** Get the price for this yeast in USD */
    Yeast.prototype.price = function () {
        return this.nameRegexPickerArray([
            { regex: /wyeast|white labs|wlp/i, value: 7.00 },
            { regex: /.*/i, value: 3.50 }
        ]);
    };
    return Yeast;
})(ingredient_1.Ingredient);
exports.Yeast = Yeast;
//# sourceMappingURL=yeast.js.map