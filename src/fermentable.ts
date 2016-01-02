import {Ingredient} from './ingredient';
import {Utils, IPoundsAndOunces, IRGB} from './util';

/**
 * A fermentable ingredient, e.g. liquid malt extract. Each ingredient
 * has a name, weight in kilograms, yield as a percentage, color in
 * degrees SRM, and is marked as either late or normal. Late additions
 * affect hop utilization. Each fermentable also provides methods for
 * getting the type, addition, color name, and gravity units per volume
 * of liquid.
 */
export class Fermentable extends Ingredient {
    /** Regular expressions to match for steeping grains, such as caramel malts.
     *  This is used to create the recipe timeline.
     */
    static STEEP: RegExp = /biscuit|black|cara|chocolate|crystal|munich|roast|special ?b|toast|victory|vienna/i;

    /** Regular expressions to match for boiling sugars (DME, LME, etc).
     *  This is used to create the recipe timeline.
     */
    static BOIL: RegExp = /candi|candy|dme|dry|extract|honey|lme|liquid|sugar|syrup|turbinado/i;

    public weight: number;
    public yield: number;
    public color: number;
    public late: boolean;

    /** Convert to JSON, storing only values that cannot be easily computed */
    // toJSON() {
    //     json = {@name, @weight, @yield, @color, @late}
    // }

    /** Get the type of fermentable based on its name, either extract
     *  or grain (steeping / mashing)
     */
    type(): string {
        return this.nameRegexPickerArray([
            { regex: Fermentable.BOIL, value: 'extract' },
            { regex: /.*/, value: 'grain' }
        ]);
    }

    /** When is this item added in the brewing process? Boil, steep, or mash? */
    addition() {
        return this.nameRegexPickerArray([
            // Forced values take precedence, then search known names and
            // default to mashing
            { regex: /mash/i, value: 'mash' },
            { regex: /steep/i, value: 'steep' },
            { regex: /boil/i, value: 'boil' },
            { regex: Fermentable.BOIL, value: 'boil' },
            { regex: Fermentable.STEEP, value: 'steep' },
            { regex: /.*/, value: 'mash' }
        ]);
    }

    /** Get the weight in pounds */
    weightLb() {
        return Utils.kgToLb(this.weight);
    }

    /** Get the weight in pounds and ounces */
    weightLbOz() {
        return Utils.kgToLbOz(this.weight);
    }

    /** Get the parts per gallon for this fermentable */
    ppg() {
        return Utils.yieldToPpg(this.yield);
    }

    /** Get the gravity for a specific liquid volume with 100% efficiency in degrees plato */
    plato(liters = 1.0) {
        return 259 - (259 / (1.0 + this.gu(liters) / 1000));
    }

    /** Get the gravity units for a specific liquid volume with 100% efficiency */
    gu(liters = 1.0) {
        // gu = parts per gallon * weight in pounds / gallons
        return this.ppg() * this.weightLb() / Utils.litersToGallons(liters);
    }

    /** Get a rgb triplet for this fermentable's color */
    colorRgb() {
        return Utils.srmToRgb(this.color);
    }

    /** Get a CSS-friendly string for this fermentable's color */
    colorCss() {
        return Utils.srmToCss(this.color);
    }

    /** Get a friendly human-readable color name */
    colorName() {
        return Utils.srmToName(this.color);
    }

    /** Get the price for this fermentable in USD */
    price() {
        var pricePerKg = this.nameRegexPickerArray([
            { regex: /dry|dme/i, value: 8.80 },
            { regex: /liquid|lme/i, value: 6.60 },
            { regex: /.*/i, value: 4.40 }
        ]);

        return this.weight * pricePerKg;
    }
}
