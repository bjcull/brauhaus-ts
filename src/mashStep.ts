import {OptionConstructor} from './base';
import {Utils} from './util';

/** Mash Step Types */
export enum MashStepType {
    // Infuse an amount of water into the mash
    Infusion = 1,
    // Modify the temperature of the mash
    Temperature,
    // Decoct an amount of liquid to boil
    Decoction
};

/** 
 * A mash step, which contains information about a specific step during the mash
 * process, such as the amount of water to add, temperature to raise or lower
 * the mash to, etc.
 */
export class MashStep extends OptionConstructor {
    /** Step name */
    public name: string;

    /** The type of mash step, defined above */
    public type: MashStepType;

    /** 
     * Optional ratio of liquid in liters per kg of grain to either infuse
     * or decoct, depending on the `type` of the mash step.
     */ 
    public waterRatio: number;

    /** Step temperature in degrees C. */ 
    public temp: number;
    
    /** Ending temperature after the step has been completed in degrees C. */
    public endTemp: number;

    /** Total time of this step in minutes */
    public time: number;

    /** Time to ramp up to the step temperature in minutes */
    public rampTime: number;

    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON() {
        return JSON.stringify({
            name: this.name,
            type: this.type,
            waterRatio: this.waterRatio,
            temp: this.temp,
            endTemp: this.endTemp,
            time: this.time,
            rampTime: this.rampTime
        });
    }

    /** 
     * Generated description based on the type and parameters of this step
     * If siUnits is true, then use SI units (liters and kilograms), otherwise
     * use quarts per pound when describing the liquid amounts.
     */ 
    description(siUnits: boolean = true, totalGrainWeight: number) {
        var desc = '';
        var absoluteUnits;
        var relativeUnits;
        var temp;
        var waterRatio;
        var waterAmount;

        if (siUnits) {
            absoluteUnits = 'l';
            relativeUnits = 'l per kg';
            temp = `${this.temp}C`;
            waterRatio = this.waterRatio;
        }
        else {
            absoluteUnits = 'qt';
            relativeUnits = 'qt per lb';
            temp = `${this.tempF()}F`;
            waterRatio = this.waterRatioQtPerLb();
        }
        
        if (totalGrainWeight) {
            if (!siUnits) {
                totalGrainWeight = Utils.kgToLb(totalGrainWeight);
            }

            waterAmount = `${(waterRatio * totalGrainWeight).toFixed(1)}${absoluteUnits}`;
        }
        else {
            waterAmount = `${waterRatio.toFixed(1)}${relativeUnits} of grain`;
        }

        switch (this.type)
        {
            case MashStepType.Infusion:
                desc = `Infuse ${waterAmount} for ${this.time} minutes at ${temp}`;
                break;
            case MashStepType.Temperature:
                desc = `Stop heating and hold for ${this.time} minutes at ${temp}`;
                break;
            case MashStepType.Decoction:
                desc = `Add ${waterAmount} boiled water to reach ${temp} and hold for ${this.time} minutes`;
                break;
            default:
                desc = `Unknown mash step type '${this.type}'!`;
        }
        
        return desc;
    }

    /** Water ratio in quarts / pound of grain */
    waterRatioQtPerLb() {
        return Utils.litersPerKgToQuartsPerLb(this.waterRatio);
    }

    /** Step temperature in degrees F */
    tempF() {
        return Utils.cToF(this.temp);
    }

    /** Step end temperature in degrees F */
    endTempF() {
        return Utils.cToF(this.endTemp);
    }
}