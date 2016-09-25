"use strict";
var globals_1 = require('./globals');
var Utils = (function () {
    function Utils() {
    }
    /**
     * Duration string to number of minutes. This will convert strings like
     * '1 hour' into 60.0 or '35 min' into 35.0. Compound strings also work,
     * for example '1 hour 5 minutes' will become 65.0.
     */
    Utils.parseDuration = function (value) {
        var duration = 0;
        var weeks = value.match(/(\d+)\s*w/i);
        var days = value.match(/(\d+)\s*d/i);
        var hours = value.match(/(\d+)\s*h/i);
        var min = value.match(/(\d+)\s*m/i);
        var sec = value.match(/(\d+)\s*s/i);
        var factors = [
            { unit: weeks, factor: 7 * 60 * 24 },
            { unit: days, factor: 60 * 24 },
            { unit: hours, factor: 60 },
            { unit: min, factor: 1 },
            { unit: sec, factor: 1.0 / 60 }
        ];
        for (var i = 0; i < factors.length; i++) {
            var unit = '0';
            if (factors[i].unit) {
                unit = factors[i].unit[1];
            }
            duration += (parseInt(unit) * factors[i].factor);
        }
        return duration;
    };
    /**
     * Return a human-friendly duration like '2 weeks' or '3 hours 12 minutes'
     * from a number of minutes. If approximate is given, then only the two
     * largest factors are included (e.g. weeks & days or days & hours) rather
     * than all possible pieces. For example '1 day 2 hours 5 minutes' would
     * become '1 day 2 hours'
     */
    Utils.displayDuration = function (minutes, approximate) {
        var durations = [];
        var factors = [
            { label: 'month', factor: 30 * 60 * 24 },
            { label: 'week', factor: 7 * 60 * 24 },
            { label: 'day', factor: 60 * 24 },
            { label: 'hour', factor: 60 },
            { label: 'minute', factor: 1 }
        ];
        var count = 0;
        for (var i = 0; i < factors.length; i++) {
            var amount = 0;
            var label = factors[i].label;
            var factor = factors[i].factor;
            if (factor == 1 || (approximate && count == approximate - 1)) {
                // Round the last item
                amount = Math.round(minutes / factor);
            }
            else {
                // Get the biggest whole number (e.g. 1 day)
                amount = Math.floor(minutes / factor);
            }
            // Set the remaining minutes
            minutes = minutes % factor;
            // Increment count of factors seen
            if (amount > 0 || count > 0) {
                count++;
            }
            if (approximate && count > approximate) {
                break;
            }
            if (amount > 0) {
                durations.push(amount + " " + label + (amount != 1 ? 's' : ''));
            }
        }
        if (!durations.length) {
            durations = ['start'];
        }
        return durations.join(' ');
    };
    /** Convert Kilograms to Pounds */
    Utils.kgToLb = function (kg) {
        return kg * 2.20462;
    };
    /** Convert Pounds to Kilograms */
    Utils.lbToKg = function (lb) {
        return lb / 2.20462;
    };
    /** Convert Kilograms to Pounds and Ounces */
    Utils.kgToLbOz = function (kg) {
        var lb = this.kgToLb(kg);
        // Returns an anonymous object with lb and oz properties
        return { pounds: Math.floor(lb), ounces: (lb - Math.floor(lb)) * 16.0 };
    };
    /** Convert Pounds and Ounces to Kilograms */
    Utils.lbOzToKg = function (value) {
        return this.lbToKg(value.pounds + (value.ounces / 16.0));
    };
    /** Convert Liters to gallons */
    Utils.litersToGallons = function (liters) {
        return liters * 0.264172;
    };
    /** Convert Gollans to Litres */
    Utils.gallonsToLiters = function (gallons) {
        return gallons / 0.264172;
    };
    /** Convert Litres per Kilogram to Quarts per Pound */
    Utils.litersPerKgToQuartsPerLb = function (litersPerKg) {
        return litersPerKg * 0.479305709;
    };
    /** Convert Quarts per Pound to Litres per Kilogram */
    Utils.quartsPerLbToLitersPerKg = function (quartsPerLb) {
        return quartsPerLb / 0.479305709;
    };
    /** Convert Celcius to Fahrenheit */
    Utils.cToF = function (celcius) {
        return (celcius * 1.8) + 32;
    };
    /** Convert Fahrenheit to Celcius */
    Utils.fToC = function (fahrenheit) {
        return (fahrenheit - 32) / 1.8;
    };
    /** Convert Yield Percentage to Parts per gallon */
    Utils.yieldToPpg = function (yieldPercentage) {
        return yieldPercentage * 0.46214;
    };
    /** Convetr Parts per Gallon to Yield Percentage */
    Utils.ppgToYield = function (ppg) {
        return ppg * 2.16385;
    };
    /** Convert SRM to EBC */
    Utils.srmToEbc = function (srm) {
        return srm * 1.97;
    };
    /** Convert EBC to SRM */
    Utils.ebcToSrm = function (ebc) {
        return ebc * 0.508;
    };
    /** Convert SRM to Lovibond */
    Utils.srmToLovibond = function (srm) {
        (srm + 0.76) / 1.3546;
    };
    /** Convert Lovibond to SRM */
    Utils.lovibondToSrm = function (lovibond) {
        return 1.3546 * lovibond - 0.76;
    };
    /** Convert SRM color values to {r, g, b} triplets */
    Utils.srmToRgb = function (srm) {
        var r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srm))));
        var g = Math.round(Math.min(255, Math.max(0, 245 * Math.pow(0.88, srm))));
        var b = Math.round(Math.min(255, Math.max(0, 220 * Math.pow(0.7, srm))));
        return { r: r, g: g, b: b };
    };
    /** Convert SRM color values to CSS-friendly strings */
    Utils.srmToCss = function (srm) {
        var rgb = this.srmToRgb(srm);
        return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    };
    /** Convert SRM color values into friendly names */
    Utils.srmToName = function (srm) {
        var color = globals_1.Globals.COLOR_NAMES[0].name;
        for (var i = 0; i < globals_1.Globals.COLOR_NAMES.length; i++) {
            var testcolor = globals_1.Globals.COLOR_NAMES[i].color;
            if (globals_1.Globals.COLOR_NAMES[i].color <= srm) {
                color = globals_1.Globals.COLOR_NAMES[i].name;
            }
        }
        return color;
    };
    /**
     * Get the approximate time to change a volume of liquid in liters by a
     * number of degrees celcius. Degrees defaults to 80 which is about
     * the temperature difference between tap water and boiling.
     * Input energy is set via `Brauhaus.BURNER_ENERGY` and is measured in
     * kilojoules per hour. It defaults to an average stovetop burner.
     */
    Utils.timeToHeat = function (liters, degrees) {
        if (degrees === void 0) { degrees = 80; }
        var kj = 4.19 * liters * degrees;
        return (kj / globals_1.Globals.BURNER_ENERGY) * 60;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=util.js.map