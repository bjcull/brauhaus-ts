import {IIngredient, Ingredient} from './ingredient';

/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
export interface IYeast extends IIngredient {
    /** Ale, lager, or other */
    type: string;
    /** Liquid or dry */
    form: string;
    /** Percentage of sugars the yeast can convert */
    attenuation: number;
}

/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
export class Yeast extends Ingredient {    
    /** Ale, lager, or other */
    public type: string;
    /** Liquid or dry */
    public form: string;
    /** Percentage of sugars the yeast can convert */
    public attenuation: number;

    constructor(yeast?: IYeast) {
        super(yeast);        
    }   
    
    /** Convert to JSON, storing only values that cannot be easily computed */
    toJSON() {
        return JSON.stringify({
            name: this.name,
            type: this.type,
            form: this.form,
            attenuation: this.attenuation
        });
    }

    /** Get the price for this yeast in USD */
    price() {
        return this.nameRegexPickerArray([
            { regex: /wyeast|white labs|wlp/i, value: 7.00 },
            { regex: /.*/i, value: 3.50 }
        ]);
    }
}