var Globals = (function () {
    function Globals() {
    }
    /** Hyperbolic tangent approximation */
    Globals.prototype.tanh = function (value) {
        return (Math.exp(value) - Math.exp(-value)) / (Math.exp(value) + Math.exp(-value));
    };
    /** Room temperature in degrees C */
    Globals.ROOM_TEMP = 23;
    /**
     * Energy output of the stovetop or gas burner in kilojoules per hour. Default
     * is based on a large stovetop burner that would put out 2,500 watts.
     */
    Globals.BURNER_ENERGY = 9000;
    /** Average mash heat loss per hour in degrees C */
    Globals.MASH_HEAT_LOSS = 5.0;
    /** Friendly beer color names and their respective SRM values */
    Globals.COLOR_NAMES = [
        { color: 2, name: 'pale straw' },
        { color: 3, name: 'straw' },
        { color: 4, name: 'yellow' },
        { color: 6, name: 'gold' },
        { color: 9, name: 'amber' },
        { color: 14, name: 'deep amber' },
        { color: 17, name: 'copper' },
        { color: 18, name: 'deep copper' },
        { color: 22, name: 'brown' },
        { color: 30, name: 'dark brown' },
        { color: 35, name: 'very dark brown' },
        { color: 40, name: 'black' }
    ];
    /** Relative sugar densities used to calculate volume from weights */
    Globals.RELATIVE_SUGAR_DENSITY = {
        cornSugar: 1.0,
        dme: 1.62,
        honey: 0.71,
        sugar: 0.88
    };
    return Globals;
})();
exports.Globals = Globals;
