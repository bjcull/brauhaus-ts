module Brauhaus {
    export interface RegexPicker<T> {
        regex: RegExp,
        value: T
    }
    
    /**
     * Base class for new recipe ingredients. Each ingredient gets a name,
     * which defaults to 'New ' + the class name. For classes that inherit
     * Ingredient it will use their name, e.g:
     */
    export class Ingredient { //extends Brauhaus.OptionConstructor
        private name: string;

        constructor(options) {
            // Set default name based on the class name
            this.name = 'New ' + options.name

            //super(options)
        }

        /** Check if a regex or list of regexes matches the name, returning
         *  either true/false or a value if the list has two items
         */
        nameRegex(regex: RegExp): boolean {
            return regex.exec(this.name) == null;
        }
        
        nameRegexArray(regexArray: RegExp[]): boolean {
            for (let i = 0; i < regexArray.length; i++) {
                if (this.nameRegex(regexArray[i])) {
                    return true;
                }
            }
            
            return false;
        }
        
        nameRegexPicker<T>(regexLabel: RegexPicker<T>): T {
            if (this.nameRegex(regexLabel.regex)) {
                return regexLabel.value;
            }
            
            return null;
        }
        
        nameRegexPickerArray<T>(regexArray: RegexPicker<T>[]): T {
            for (let i = 0; i < regexArray.length; i++) {
                if (this.nameRegex(regexArray[i].regex)) {
                    return regexArray[i].value;
                }
            }

            return null;
        }
    }
}