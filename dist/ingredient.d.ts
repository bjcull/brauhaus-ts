export interface RegexPicker<T> {
    regex: RegExp;
    value: T;
}
/**
 * Base class for new recipe ingredients. Each ingredient gets a name,
 * which defaults to 'New ' + the class name. For classes that inherit
 * Ingredient it will use their name, e.g:
 */
export declare class Ingredient {
    private name;
    constructor(options: any);
    /** Check if a regex or list of regexes matches the name, returning
     *  either true/false or a value if the list has two items
     */
    nameRegex(regex: RegExp): boolean;
    nameRegexArray(regexArray: RegExp[]): boolean;
    nameRegexPicker<T>(regexLabel: RegexPicker<T>): T;
    nameRegexPickerArray<T>(regexArray: RegexPicker<T>[]): T;
}
