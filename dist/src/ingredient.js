"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('./base');
/**
 * Base class for new recipe ingredients. Each ingredient gets a name,
 * which defaults to 'New ' + the class name. For classes that inherit
 * Ingredient it will use their name, e.g:
 */
var IIngredient = (function () {
    function IIngredient() {
    }
    return IIngredient;
}());
exports.IIngredient = IIngredient;
/**
 * Base class for new recipe ingredients. Each ingredient gets a name,
 * which defaults to 'New ' + the class name. For classes that inherit
 * Ingredient it will use their name, e.g:
 */
var Ingredient = (function (_super) {
    __extends(Ingredient, _super);
    function Ingredient(options) {
        _super.call(this);
        // Set default name based on the class name
        if (!this.name) {
            this.name = 'New Ingredient';
        }
        _super.prototype.initialise.call(this, options);
    }
    /** Check if a regex or list of regexes matches the name, returning
     *  either true/false or a value if the list has two items
     */
    Ingredient.prototype.nameRegex = function (regex) {
        var result = regex.exec(this.name.toLowerCase());
        return result != null;
    };
    Ingredient.prototype.nameRegexArray = function (regexArray) {
        for (var i = 0; i < regexArray.length; i++) {
            if (this.nameRegex(regexArray[i])) {
                return true;
            }
        }
        return false;
    };
    Ingredient.prototype.nameRegexPicker = function (regexLabel) {
        if (this.nameRegex(regexLabel.regex)) {
            return regexLabel.value;
        }
        return null;
    };
    Ingredient.prototype.nameRegexPickerArray = function (regexArray) {
        for (var i = 0; i < regexArray.length; i++) {
            if (this.nameRegex(regexArray[i].regex)) {
                return regexArray[i].value;
            }
        }
        return null;
    };
    return Ingredient;
}(base_1.OptionConstructor));
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.js.map