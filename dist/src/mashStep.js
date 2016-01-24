var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('./base');
var util_1 = require('./util');
/** Mash Step Types */
(function (MashStepType) {
    // Infuse an amount of water into the mash
    MashStepType[MashStepType["Infusion"] = 1] = "Infusion";
    // Modify the temperature of the mash
    MashStepType[MashStepType["Temperature"] = 2] = "Temperature";
    // Decoct an amount of liquid to boil
    MashStepType[MashStepType["Decoction"] = 3] = "Decoction";
})(exports.MashStepType || (exports.MashStepType = {}));
var MashStepType = exports.MashStepType;
;
/**
 * A mash step, which contains information about a specific step during the mash
 * process, such as the amount of water to add, temperature to raise or lower
 * the mash to, etc.
 */
var MashStep = (function (_super) {
    __extends(MashStep, _super);
    function MashStep(mashStep) {
        _super.call(this, mashStep);
    }
    /** Convert to JSON, storing only values that cannot be easily computed */
    MashStep.prototype.toJSON = function () {
        return {
            name: this.name,
            type: this.type,
            waterRatio: this.waterRatio,
            temp: this.temp,
            endTemp: this.endTemp,
            time: this.time,
            rampTime: this.rampTime
        };
    };
    /**
     * Generated description based on the type and parameters of this step
     * If siUnits is true, then use SI units (liters and kilograms), otherwise
     * use quarts per pound when describing the liquid amounts.
     */
    MashStep.prototype.description = function (siUnits, totalGrainWeight) {
        if (siUnits === void 0) { siUnits = true; }
        var desc = '';
        var absoluteUnits;
        var relativeUnits;
        var temp;
        var waterRatio;
        var waterAmount;
        if (siUnits) {
            absoluteUnits = 'l';
            relativeUnits = 'l per kg';
            temp = this.temp + "C";
            waterRatio = this.waterRatio;
        }
        else {
            absoluteUnits = 'qt';
            relativeUnits = 'qt per lb';
            temp = this.tempF() + "F";
            waterRatio = this.waterRatioQtPerLb();
        }
        if (totalGrainWeight) {
            if (!siUnits) {
                totalGrainWeight = util_1.Utils.kgToLb(totalGrainWeight);
            }
            waterAmount = "" + (waterRatio * totalGrainWeight).toFixed(1) + absoluteUnits;
        }
        else {
            waterAmount = "" + waterRatio.toFixed(1) + relativeUnits + " of grain";
        }
        switch (this.type) {
            case MashStepType.Infusion:
                desc = "Infuse " + waterAmount + " for " + this.time + " minutes at " + temp;
                break;
            case MashStepType.Temperature:
                desc = "Stop heating and hold for " + this.time + " minutes at " + temp;
                break;
            case MashStepType.Decoction:
                desc = "Add " + waterAmount + " boiled water to reach " + temp + " and hold for " + this.time + " minutes";
                break;
            default:
                desc = "Unknown mash step type '" + this.type + "'!";
        }
        return desc;
    };
    /** Water ratio in quarts / pound of grain */
    MashStep.prototype.waterRatioQtPerLb = function () {
        return util_1.Utils.litersPerKgToQuartsPerLb(this.waterRatio);
    };
    /** Step temperature in degrees F */
    MashStep.prototype.tempF = function () {
        return util_1.Utils.cToF(this.temp);
    };
    /** Step end temperature in degrees F */
    MashStep.prototype.endTempF = function () {
        return util_1.Utils.cToF(this.endTemp);
    };
    return MashStep;
})(base_1.OptionConstructor);
exports.MashStep = MashStep;
//# sourceMappingURL=mashStep.js.map