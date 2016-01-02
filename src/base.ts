export class OptionConstructor {


    /** A base class which sets passed options as properties on itself. */
    /** A mapping of parameter names to objects. When an option is encountered
     *  with a matching param name, it is instantiated as that object if it
     *  is not already an instance of the object. If it is an array, then each
     *  item in the array is instantiated or copied.
     */ 
    private _paramMap: any = {}

    constructor(options: any) {
        // Convert JSON strings to objects
        if (typeof (options) == 'string') {
            options = JSON.parse(options);
        }

        // Set any properties passed in
        var keys = Object.keys(this._paramMap);
        for (let property in options)
        {
            // Is this a property that requires a constructor?
            if (property in keys)
            {
                // Don't construct null values
                if (options[property] == null) { continue; }

                // Is the property an arrary or a single object?
                if (options[property] instanceof Array)
                {    
                    // Set the property to a mapped array, calling the
                    // constructor method to instantiate new objects
                    // if they are not already instances
                    for (let a = 0; a < options[property].length; a++) {
                        let item = options[property][a]; 
                        if (item instanceof this._paramMap[property]) {
                            this[property] = item;
                        }
                        else {
                            this[property] = new this._paramMap[property](item);
                        }
                    }
                }
                else
                {
                    // Set the property to an instance of the constructor
                    if (options[property] instanceof this._paramMap[property])
                    {
                        this[property] = options[property]
                    }
                    else
                    {
                        this[property] = new this._paramMap[property](options[property])
                    }
                }
            }
            else
            {
                this[property] = options[property]
            }
        }
    }
}