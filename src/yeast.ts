import {Ingredient} from './ingredient';

/**
 * A yeast ingredient, e.g. Safbrew T-58 or Brett B. Each yeast has a
 * type (ale, lager, other), a form (liquid, dry), and an attenuation
 * percentage that describes the maximum attenuation under ideal
 * conditions.
 */
export class Yeast extends Ingredient {    
    public type: string;
    public form: string;
    public attenuation: number;

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