export declare class OptionConstructor {
    /** A base class which sets passed options as properties on itself. */
    /** A mapping of parameter names to objects. When an option is encountered
     *  with a matching param name, it is instantiated as that object if it
     *  is not already an instance of the object. If it is an array, then each
     *  item in the array is instantiated or copied.
     */
    protected _paramMap: any;
    constructor(options: any);
}
