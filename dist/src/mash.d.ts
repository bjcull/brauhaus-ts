import { OptionConstructor } from './base';
import { MashStep } from './mashStep';
/**
 * A mash profile, which contains information about a mash along with a list
 * of steps to be taken.
 */
export declare class Mash extends OptionConstructor {
    constructor(options: any);
    /** A list of steps to complete */
    steps: MashStep[];
    /** The mash name / description */
    name: string;
    /** Temperature of the grain in degrees C */
    grainTemp: number;
    /** Temperature of the sparge water in degrees C */
    spargeTemp: number;
    /** Target PH of the mash */
    ph: number;
    /** Any notes useful for another brewer when mashing */
    notes: string;
    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON(): string;
    /** Temperature of the grain in degrees F */
    grainTempF(): number;
    spargeTempF(): number;
    /** Shortcut to add a step to the mash */
    addStep(options: any): number;
}
