import {OptionConstructor} from './base';
import {MashStep} from './mashStep';
import {Globals} from './globals';
import {Utils} from './util';

/**
 * A mash profile, which contains information about a mash along with a list
 * of steps to be taken.
 */
export class Mash extends OptionConstructor {
    constructor(options?) { 
        super(options)
        
        // Set default mash step list to a new empty list
        this.steps = [];
    }

    /** A list of steps to complete */
    public steps: MashStep[];
    
    /** The mash name / description */
    public name: string;

    /** Temperature of the grain in degrees C */
    public grainTemp: number;

    /** Temperature of the sparge water in degrees C */
    public spargeTemp: number;

    /** Target PH of the mash */
    public ph: number;

    /** Any notes useful for another brewer when mashing */
    public notes: string;

    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON() {
        return JSON.stringify({
            name: this.name,
            grainTemp: this.grainTemp,
            spargeTemp: this.spargeTemp,
            ph: this.ph,
            notes: this.notes,
            steps: this.steps
        });
    }

    /** Temperature of the grain in degrees F */
    grainTempF() {
        return Utils.cToF(this.grainTemp);
    }

    spargeTempF() {
        return Utils.cToF(this.spargeTemp);
    }

    /** Shortcut to add a step to the mash */
    addStep(options) {
        return this.steps.push(new MashStep(options));
    }
}