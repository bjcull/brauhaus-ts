/** A base class which sets passed options as properties on itself. */
export declare class OptionConstructor {
    /** A mapping of parameter names to objects. When an option is encountered
     *  with a matching param name, it is instantiated as that object if it
     *  is not already an instance of the object. If it is an array, then each
     *  item in the array is instantiated or copied.
     */
    protected _paramMap: any;
    /** An instance id for when passing objects isn't possible */
    id: string;
    initialise(options: any): void;
}
