'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('./base');
var fermentable_1 = require('./fermentable');
var yeast_1 = require('./yeast');
var spice_1 = require('./spice');
var mash_1 = require('./mash');
var mashstep_1 = require('./mashstep');
var globals_1 = require('./globals');
var util_1 = require('./util');
/**
 * A beer recipe, consisting of various ingredients and metadata which
 * provides a calculate() method to calculate OG, FG, IBU, ABV, and a
 * timeline of instructions for brewing the recipe.
 */
var Recipe = (function (_super) {
    __extends(Recipe, _super);
    function Recipe(options) {
        this.fermentables = [];
        this.spices = [];
        this.yeast = [];
        this._paramMap = {
            fermentables: fermentable_1.Fermentable,
            spices: spice_1.Spice,
            yeast: yeast_1.Yeast,
            mash: mash_1.Mash
        };
        _super.call(this, options);
    }
    /** Export a recipe to JSON, which stores all values which are not
     * easily computed via Recipe.prototype.calculate(). This method
     * gets called when using JSON.stringify(recipe).
     */
    Recipe.prototype.toJSON = function () {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            author: this.author,
            boilSize: this.boilSize,
            batchSize: this.batchSize,
            servingSize: this.servingSize,
            steepEfficiency: this.steepEfficiency,
            steepTime: this.steepTime,
            mashEfficiency: this.mashEfficiency,
            style: this.style,
            ibuMethod: this.ibuMethod,
            fermentables: this.fermentables,
            spices: this.spices,
            yeast: this.yeast,
            mash: this.mash,
            bottlingTemp: this.bottlingTemp,
            bottlingPressure: this.bottlingPressure,
            primaryDays: this.primaryDays,
            primaryTemp: this.primaryTemp,
            secondaryDays: this.secondaryDays,
            secondaryTemp: this.secondaryTemp,
            tertiaryDays: this.tertiaryDays,
            tertiaryTemp: this.tertiaryTemp,
            agingDays: this.agingDays,
            agingTemp: this.agingTemp
        };
    };
    /** Get the batch size in gallons */
    Recipe.prototype.batchSizeGallons = function () {
        return util_1.Utils.litersToGallons(this.batchSize);
    };
    /** Get the boil size in gallons */
    Recipe.prototype.boilSizeGallons = function () {
        return util_1.Utils.litersToGallons(this.boilSize);
    };
    Recipe.prototype.add = function (type, values) {
        switch (type) {
            case 'fermentable':
                this.fermentables.push(new fermentable_1.Fermentable(values));
                break;
            case 'spice', 'hop':
                this.spices.push(new spice_1.Spice(values));
                break;
            case 'yeast':
                this.yeast.push(new yeast_1.Yeast(values));
                break;
        }
    };
    Recipe.prototype.addFermentable = function (fermentable) {
        this.fermentables.push(fermentable);
    };
    Recipe.prototype.addSpice = function (spice) {
        this.spices.push(spice);
    };
    Recipe.prototype.addHop = function (spice) {
        this.spices.push(spice);
    };
    Recipe.prototype.addYeast = function (yeast) {
        this.yeast.push(yeast);
    };
    /** Get the total weight of grains in kg */
    Recipe.prototype.grainWeight = function () {
        var weight = 0.0;
        for (var i = 0; i < this.fermentables.length; i++) {
            var fermentable = this.fermentables[i];
            if (fermentable.type() == 'grain') {
                weight += fermentable.weight;
            }
        }
        return weight;
    };
    /** Get the total number of whole bottles (i.e. servings) */
    Recipe.prototype.bottleCount = function () {
        return Math.floor(this.batchSize / this.servingSize);
    };
    /** Get a friendly human-readable color name */
    Recipe.prototype.colorName = function () {
        return util_1.Utils.srmToName(this.color);
    };
    /** Get a CSS-friendly string for this fermentable's color */
    Recipe.prototype.colorCss = function () {
        return util_1.Utils.srmToCss(this.color);
    };
    /** Scale this recipe, keeping gravity and bitterness the same */
    Recipe.prototype.scale = function (batchSize, boilSize) {
        var earlyOg = 1.0;
        var newEarlyOg = 1.0;
        for (var i = 0; i < this.fermentables.length; i++) {
            var fermentable = this.fermentables[i];
            // Store early gravity for bitterness calculations
            var efficiency = 1.0;
            if (fermentable.addition() == 'steep') {
                efficiency = this.steepEfficiency / 100.0;
            }
            else if (fermentable.addition() == 'mash') {
                efficiency = this.mashEfficiency / 100.0;
            }
            if (!fermentable.late) {
                earlyOg += fermentable.gu(this.boilSize) * efficiency / 1000.0;
            }
            // Adjust fermentable weight
            fermentable.weight *= batchSize / this.batchSize;
            if (!fermentable.late) {
                newEarlyOg += fermentable.gu(boilSize) * efficiency / 1000.0;
            }
        }
        for (var i = 0; i < this.spices.length; i++) {
            var spice = this.spices[i];
            if (spice.aa && spice.time) {
                var bitterness = spice.bitterness(this.ibuMethod, earlyOg, this.batchSize);
                if (this.ibuMethod == 'tinseth') {
                    spice.weight = (bitterness * batchSize) / (1.65 * Math.pow(0.000125, newEarlyOg - 1.0) * ((1 - Math.pow(2.718, -0.04 * spice.time)) / 4.15) * (spice.aa / 100 * 1000000) * spice.utilizationFactor());
                }
                else if (this.ibuMethod == 'rager') {
                    var utilization = 18.11 + 13.86 * globals_1.Globals.tanh((spice.time - 31.32) / 18.27);
                    var adjustment = Math.max(0, (newEarlyOg - 1.050) / 0.2);
                    spice.weight = bitterness / (100 * utilization * spice.utilizationFactor() * spice.aa / (batchSize * (1 + adjustment)));
                }
            }
            else {
                // Scale linearly, no bitterness
                spice.weight *= batchSize / this.batchSize;
            }
        }
        this.batchSize = batchSize;
        this.boilSize = boilSize;
    };
    Recipe.prototype.isValueInArray = function (value, values) {
        for (var i = 0; i < values.length; i++) {
            if (values[i] == value) {
                return true;
            }
        }
        return false;
    };
    /**
     *  Give this recipe a grade based on the completeness and quality
     *  of the recipe, where the larger the grade, the better the
     *  recipe quality. A totally blank recipe will return zero.
     */
    Recipe.prototype.grade = function () {
        var _this = this;
        var grade = 0.0;
        // Basic recipe name, description, and author should be set
        if (!this.isValueInArray(this.name.toLowerCase(), ['', 'new recipe', 'untitled'])) {
            grade += 1.0;
        }
        if (!this.isValueInArray(this.description.toLowerCase(), ['', 'recipe description'])) {
            grade += 1.0;
        }
        if (this.isValueInArray(this.author.toLowerCase(), ['', 'anonymous brewer'])) {
            grade += 1.0;
        }
        // A BJCP or other target style should be set
        if (this.style) {
            grade += 0.5;
        }
        // Do we have at least one of each fermentable/spice/yeast?
        for (var ingredients in [this.fermentables, this.spices, this.yeast]) {
            if (ingredients.length) {
                grade += 1.0;
                var filterFunc = function (x) {
                    return _this.isValueInArray(x.name.toLowerCase(), [
                        '',
                        'new fermentable',
                        'new spice',
                        'new yeast']);
                };
                // Do all items have a name?
                for (var i = 0; i < ingredients.length; i++) {
                    if (!ingredients.filter(filterFunc).length) {
                        grade += 0.5;
                    }
                }
            }
        }
        return grade;
    };
    Recipe.prototype.calculate = function () {
        this.og = 1.0;
        this.fg = 0.0;
        this.ibu = 0.0;
        this.price = 0.0;
        var earlyOg = 1.0;
        var mcu = 0.0;
        var attenuation = 0.0;
        // A map of various ingredient values used to generate the timeline
        // steps below.
        this.timelineMap = {
            fermentables: {
                mash: [],
                steep: [],
                boil: [],
                boilEnd: []
            },
            times: {},
            drySpice: {},
            yeast: []
        };
        // Calculate gravities and color from fermentables
        for (var i = 0; i < this.fermentables.length; i++) {
            var fermentable = this.fermentables[i];
            var efficiency = 1.0;
            if (fermentable.addition() == 'steep') {
                efficiency = this.steepEfficiency / 100.0;
            }
            else if (fermentable.addition() == 'mash') {
                efficiency = this.mashEfficiency / 100.0;
            }
            mcu += fermentable.color * fermentable.weightLb() / this.batchSizeGallons();
            // Update gravities
            var gu = fermentable.gu(this.batchSize) * efficiency;
            var gravity = gu / 1000.0;
            this.og += gravity;
            if (!fermentable.late) {
                earlyOg += fermentable.gu(this.boilSize) * efficiency / 1000.0;
            }
            // Update recipe price with fermentable
            this.price += fermentable.price();
            // Add fermentable info into the timeline map
            if (fermentable.addition() == 'boil') {
                if (!fermentable.late) {
                    this.timelineMap.fermentables.boil.push([fermentable, gu]);
                }
                else {
                    this.timelineMap.fermentables.boilEnd.push([fermentable, gu]);
                }
            }
            else if (fermentable.addition() == 'steep') {
                this.timelineMap.fermentables.steep.push([fermentable, gu]);
            }
            else if (fermentable.addition() == 'mash') {
                this.timelineMap.fermentables.mash.push({ fermentable: fermentable, gravity: gu });
            }
        }
        this.color = 1.4922 * Math.pow(mcu, 0.6859);
        // Get attenuation for final gravity
        for (var i = 0; i < this.yeast.length; i++) {
            var yeast = this.yeast[i];
            if (yeast.attenuation > attenuation) {
                attenuation = yeast.attenuation;
            }
            // Update recipe price with yeast
            this.price += yeast.price();
            // Add yeast info into the timeline map
            this.timelineMap.yeast.push(yeast);
        }
        if (attenuation == 0) {
            attenuation = 75.0;
        }
        // Update final gravity based on original gravity and maximum
        // attenuation from yeast.
        this.fg = this.og - ((this.og - 1.0) * attenuation / 100.0);
        // Update alcohol by volume based on original and final gravity
        this.abv = ((1.05 * (this.og - this.fg)) / this.fg) / 0.79 * 100.0;
        // Gravity degrees plato approximations
        this.ogPlato = (-463.37) + (668.72 * this.og) - (205.35 * (this.og * this.og));
        this.fgPlato = (-463.37) + (668.72 * this.fg) - (205.35 * (this.fg * this.fg));
        // Update calories
        this.realExtract = (0.1808 * this.ogPlato) + (0.8192 * this.fgPlato);
        this.abw = 0.79 * this.abv / this.fg;
        this.calories = Math.max(0, ((6.9 * this.abw) + 4.0 * (this.realExtract - 0.10)) * this.fg * this.servingSize * 10);
        // Calculate bottle / keg priming amounts
        var v = this.bottlingPressure || 2.5;
        var t = util_1.Utils.cToF(this.bottlingTemp || globals_1.Globals.ROOM_TEMP);
        this.primingCornSugar = .015195 * 5 * (v - 3.0378 + (0.050062 * t) - (0.00026555 * t * t));
        this.primingSugar = this.primingCornSugar * 0.90995;
        this.primingHoney = this.primingCornSugar * 1.22496;
        this.primingDme = this.primingCornSugar * 1.33249;
        // Calculate bitterness
        for (var i = 0; i < this.spices.length; i++) {
            var spice = this.spices[i];
            var bitterness = 0.0;
            var time = spice.time;
            if (spice.aa && spice.use.toLowerCase() == 'boil') {
                this.ibu += spice.bitterness(this.ibuMethod, earlyOg, this.batchSize);
            }
            // Update recipe price with spice
            this.price += spice.price();
            // Update timeline map with hop information
            if (spice.dry()) {
                this.timelineMap['drySpice'][time] = this.timelineMap['drySpice'][time] || [];
                this.timelineMap['drySpice'][time].push([spice, bitterness]);
            }
            else {
                this.timelineMap.times[time] = this.timelineMap.times[time] || [];
                this.timelineMap.times[time].push({ spice: spice, bitterness: bitterness });
            }
        }
        // Calculate bitterness to gravity ratios
        this.buToGu = this.ibu / (this.og - 1.000) / 1000.0;
        // http://klugscheisserbrauerei.wordpress.com/beer-balance/
        var rte = (0.82 * (this.fg - 1.000) + 0.18 * (this.og - 1.000)) * 1000.0;
        this.bv = 0.8 * this.ibu / rte;
    };
    /**
     *  Get a timeline as a list of [[time, description], ...] that can be put
     *  into a list or table. If siUnits is true, then use metric units,
     *  otherwise use imperial units.
     *  You MUST call `calculate()` on this recipe before this method.
     */
    Recipe.prototype.timeline = function (siUnits) {
        if (siUnits === void 0) { siUnits = true; }
        var timeline = [];
        var boilName = 'water';
        var totalTime = 0;
        var currentTemp = globals_1.Globals.ROOM_TEMP;
        var liquidVolume = 0;
        // Get a list of fermentable descriptions taking siUnits into account
        var fermentableList = function (items) {
            var ingredients = [];
            var weight = "";
            for (var i = 0; i < items.length; i++) {
                var fermentable = items[i].fermentable;
                var gravity = items[i].gravity;
                if (siUnits) {
                    weight = fermentable.weight.toFixed(2) + "kg";
                }
                else {
                    var lboz = fermentable.weightLbOz();
                    weight = lboz.pounds + "lb " + lboz.ounces + "oz";
                }
                ingredients.push(weight + " of " + fermentable.name + " (" + gravity.toFixed(1) + " GU)");
            }
            return ingredients;
        };
        // Get a list of spice descriptions taking siUnits into account
        var spiceList = function (items) {
            var ingredients = [];
            var weight = "";
            for (var i = 0; i < items.length; i++) {
                var spice = items[i].spice;
                var ibu = items[i].ibu;
                if (siUnits) {
                    weight = (spice.weight * 1000) + "g";
                }
                else {
                    weight = (spice.weightLb() * 16.0).toFixed(2) + "oz";
                }
                var extra = '';
                if (ibu) {
                    extra = " (" + ibu.toFixed(1) + " IBU)";
                }
                ingredients.push(weight + " of " + spice.name + extra);
            }
            return ingredients;
        };
        if (this.timelineMap.fermentables.mash.length) {
            var boilName = 'wort';
            var mash = this.mash;
            mash = mash || new mash_1.Mash();
            var ingredients = fermentableList(this.timelineMap.fermentables.mash);
            timeline.push([totalTime, ("Begin " + mash.name + " mash. Add " + ingredients.join(', ') + ".")]);
            var steps = this.mash.steps || [
                // Default to a basic 60 minute single-infustion mash at 68C
                new mashstep_1.MashStep({
                    name: 'Saccharification',
                    type: mashstep_1.MashStepType.Infusion,
                    time: 60,
                    rampTime: util_1.Utils.timeToHeat(this.grainWeight(), 68 - currentTemp),
                    temp: 68,
                    waterRatio: 2.75 })
            ];
            for (var i = 0; i < steps.length; i++) {
                var step = steps[i];
                var strikeVolume = (step.waterRatio * this.grainWeight()) - liquidVolume;
                var strikeVolumeDesc = "";
                var strikeTempDesc = "";
                if (step.temp != currentTemp && strikeVolume > 0) {
                    // We are adding hot or cold water!
                    var strikeTemp = ((step.temp - currentTemp) * (0.4184 * this.grainWeight()) / strikeVolume) + step.temp;
                    var timeToHeat = util_1.Utils.timeToHeat(strikeVolume, strikeTemp - currentTemp);
                    if (siUnits) {
                        strikeVolumeDesc = strikeVolume.toFixed(1) + "l";
                        strikeTempDesc = Math.round(strikeTemp) + "\u00B0C";
                    }
                    else {
                        strikeVolumeDesc = (util_1.Utils.litersToGallons(strikeVolume) * 4).toFixed(1) + "qts";
                        strikeTempDesc = Math.round(util_1.Utils.cToF(strikeTemp)) + "\u00B0F";
                    }
                    timeline.push([totalTime, ("Heat " + strikeVolumeDesc + " to " + strikeTempDesc + " (about " + Math.round(timeToHeat) + " minutes)")]);
                    liquidVolume += strikeVolume;
                    totalTime += timeToHeat;
                }
                else if (step.temp != currentTemp) {
                    var heatTemp = "";
                    timeToHeat = util_1.Utils.timeToHeat(liquidVolume, step.temp - currentTemp);
                    if (siUnits) {
                        heatTemp = Math.round(step.temp) + "\u00B0C";
                    }
                    else {
                        heatTemp = Math.round(util_1.Utils.cToF(step.temp)) + "\u00B0F";
                    }
                    timeline.push([totalTime, ("Heat the mash to " + heatTemp + " (about " + Math.round(timeToHeat) + " minutes)")]);
                    totalTime += timeToHeat;
                }
                timeline.push([totalTime, (step.name + ": " + step.description(siUnits, this.grainWeight()) + ".")]);
                totalTime += step.time;
                currentTemp = step.temp - (step.time * globals_1.Globals.MASH_HEAT_LOSS / 60.0);
            }
            timeline.push([totalTime, 'Remove grains from mash. This is now your wort.']);
            totalTime += 5;
        }
        if (this.timelineMap.fermentables.steep.length) {
            var boilName = 'wort';
            var steepWeight = 0;
            var steepVolume = "";
            var steepTemp = "";
            for (var i = 0; i < this.timelineMap.fermentables.steep.length; i++) {
                var fermentable = this.timelineMap.fermentables.steep[i].fermentable;
                steepWeight += fermentable.weight;
            }
            var steepHeatTime = util_1.Utils.timeToHeat(steepWeight * 2.75, 68 - currentTemp);
            currentTemp = 68;
            liquidVolume += steepWeight * 2.75;
            if (siUnits) {
                steepVolume = (steepWeight * 2.75).toFixed(1) + "l";
                steepTemp = 68 + "\u00B0C";
            }
            else {
                steepVolume = util_1.Utils.litersToGallons(steepWeight * 2.75).toFixed(1) + "gal";
                steepTemp = util_1.Utils.cToF(68).toFixed(1) + "\u00B0F";
            }
            timeline.push([totalTime, ("Heat " + steepVolume + " to " + steepTemp + " (about " + Math.round(steepHeatTime) + " minutes)")]);
            totalTime += steepHeatTime;
            var ingredients = fermentableList(this.timelineMap.fermentables.steep);
            timeline.push([totalTime, ("Add " + ingredients.join(', ') + " and steep for " + this.steepTime + " minutes.")]);
            totalTime += 20;
        }
        // Adjust temperature based on added water
        var waterChangeRatio = Math.min(1, liquidVolume / this.boilSize);
        currentTemp = (currentTemp * waterChangeRatio) + (globals_1.Globals.ROOM_TEMP * (1.0 - waterChangeRatio));
        var boilVolume = "";
        if (siUnits) {
            boilVolume = this.boilSize.toFixed(1) + "l";
        }
        else {
            boilVolume = this.boilSizeGallons().toFixed(1) + "gal";
        }
        var action = "";
        if (this.boilSize - liquidVolume < this.boilSize) {
            action = "Top up the " + boilName + " to " + boilVolume + " and heat to a rolling boil";
        }
        else {
            action = "Bring " + boilVolume + " to a rolling boil";
        }
        var boilTime = util_1.Utils.timeToHeat(this.boilSize, 100 - currentTemp);
        timeline.push([totalTime, (action + " (about " + boilTime + " minutes).")]);
        totalTime += boilTime;
        this.boilStartTime = totalTime;
        var times = Object.keys(this.timelineMap.times);
        // If we have late additions and no late addition time, add it
        if (this.timelineMap.fermentables.boilEnd.length && times.indexOf("5") == -1) {
            this.timelineMap.times[5] = [];
            times.push("5");
        }
        var previousSpiceTime = 0;
        // Sort times by descending here
        var spiceCounter = 0;
        for (var i = 0; i < times.length; i++) {
            var time = parseInt(times[i]);
            var ingredients = spiceList(this.timelineMap.times[time]);
            if (spiceCounter == 0) {
                ingredients = fermentableList(this.timelineMap.fermentables.boil).concat(ingredients);
                previousSpiceTime = time;
            }
            totalTime += previousSpiceTime - time;
            previousSpiceTime = time;
            if (time == 5 && this.timelineMap.fermentables.boilEnd.length) {
                ingredients = fermentableList(this.timelineMap.fermentables.boilEnd).concat(ingredients);
            }
            timeline.push([totalTime, ("Add " + ingredients.join(', '))]);
        }
        totalTime += previousSpiceTime;
        // EDITING ENDS HERE
        this.boilEndTime = totalTime;
        var chillTemp = "";
        if (siUnits) {
            chillTemp = this.primaryTemp + "\u00B0C";
        }
        else {
            chillTemp = util_1.Utils.cToF(this.primaryTemp) + "\u00B0F";
        }
        timeline.push([totalTime, ("Flame out. Begin chilling to " + chillTemp + " and aerate the cooled wort (about 20 minutes).")]);
        totalTime += 20;
        var yeasts = this.yeast.map(function (x) { return x.name; });
        if (!yeasts.length && this.primaryDays) {
            // No yeast given, but primary fermentation should happen...
            // Let's just use a generic "yeast" to pitch.
            yeasts = ['yeast'];
        }
        if (yeasts.length) {
            timeline.push([totalTime, ("Pitch " + yeasts.join(', ') + " and seal the fermenter. You should see bubbles in the airlock within 24 hours.")]);
        }
        // The brew day is over! Fermenting starts now.
        this.brewDayDuration = totalTime;
        if (!this.primaryDays && !this.secondaryDays && !this.tertiaryDays) {
            timeline.push([totalTime, ("Drink immediately (about " + this.bottleCount() + " bottles).")]);
            return timeline;
        }
        totalTime += this.primaryDays * 1440;
        if (this.secondaryDays) {
            timeline.push([totalTime, ("Move to secondary fermenter for " + util_1.Utils.displayDuration(this.secondaryDays * 1440, 2) + ".")]);
            totalTime += this.secondaryDays * 1440;
        }
        if (this.tertiaryDays) {
            timeline.push([totalTime, ("Move to tertiary fermenter for " + util_1.Utils.displayDuration(this.tertiaryDays * 1440, 2) + ".")]);
            totalTime += this.tertiaryDays * 1440;
        }
        var primeMsg = "Prime and bottle about " + this.bottleCount() + " bottles.";
        if (this.agingDays) {
            var ageTemp = "";
            if (siUnits) {
                ageTemp = this.agingTemp + "C";
            }
            else {
                ageTemp = util_1.Utils.cToF(this.agingTemp) + "F";
            }
            primeMsg += " Age at " + ageTemp + " for " + this.agingDays + " days.";
        }
        timeline.push([totalTime, primeMsg]);
        totalTime += this.agingDays * 1440;
        timeline.push([totalTime, 'Relax, don\'t worry and have a homebrew!']);
        return timeline;
    };
    return Recipe;
})(base_1.OptionConstructor);
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.js.map