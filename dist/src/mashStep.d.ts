import { OptionConstructor } from './base';
/** Mash Step Types */
export declare enum MashStepType {
    Infusion = 1,
    Temperature = 2,
    Decoction = 3,
}
/**
 * A mash step, which contains information about a specific step during the mash
 * process, such as the amount of water to add, temperature to raise or lower
 * the mash to, etc.
 */
export declare class MashStep extends OptionConstructor {
    /** Step name */
    name: string;
    /** The type of mash step, defined above */
    type: MashStepType;
    /**
     * Optional ratio of liquid in liters per kg of grain to either infuse
     * or decoct, depending on the `type` of the mash step.
     */
    waterRatio: number;
    /** Step temperature in degrees C. */
    temp: number;
    /** Ending temperature after the step has been completed in degrees C. */
    endTemp: number;
    /** Total time of this step in minutes */
    time: number;
    /** Time to ramp up to the step temperature in minutes */
    rampTime: number;
    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON(): string;
    /**
     * Generated description based on the type and parameters of this step
     * If siUnits is true, then use SI units (liters and kilograms), otherwise
     * use quarts per pound when describing the liquid amounts.
     */
    description(siUnits: boolean, totalGrainWeight: number): string;
    /** Water ratio in quarts / pound of grain */
    waterRatioQtPerLb(): number;
    /** Step temperature in degrees F */
    tempF(): number;
    /** Step end temperature in degrees F */
    endTempF(): number;
}
