/**
 * Base class for new recipe ingredients. Each ingredient gets a name,
 * which defaults to 'New ' + the class name. For classes that inherit
 * Ingredient it will use their name, e.g:
 */
var Ingredient = (function () {
    function Ingredient(options) {
        // Set default name based on the class name
        this.name = 'New ' + options.name;
        //super(options)
    }
    /** Check if a regex or list of regexes matches the name, returning
     *  either true/false or a value if the list has two items
     */
    Ingredient.prototype.nameRegex = function (regex) {
        return regex.exec(this.name) == null;
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
})();
exports.Ingredient = Ingredient;
