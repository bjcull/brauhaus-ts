import { OptionConstructor } from './base';
import { Fermentable } from './fermentable';
import { Yeast } from './yeast';
import { Spice } from './spice';
import { Mash } from './mash';
/**
 * A beer recipe, consisting of various ingredients and metadata which
 * provides a calculate() method to calculate OG, FG, IBU, ABV, and a
 * timeline of instructions for brewing the recipe.
 */
export declare class Recipe extends OptionConstructor {
    name: string;
    description: string;
    author: string;
    boilSize: number;
    batchSize: number;
    servingSize: number;
    steepEfficiency: number;
    steepTime: number;
    mashEfficiency: number;
    style: any;
    /** The IBU calculation method (tinseth or rager) */
    ibuMethod: string;
    fermentables: Fermentable[];
    spices: Spice[];
    yeast: Yeast[];
    mash: Mash;
    og: number;
    fg: number;
    color: number;
    ibu: number;
    abv: number;
    price: number;
    /** Bitterness to gravity ratio */
    buToGu: number;
    /** Balance value (http://klugscheisserbrauerei.wordpress.com/beer-balance/) */
    bv: number;
    ogPlato: number;
    fgPlato: number;
    abw: number;
    realExtract: number;
    calories: number;
    bottlingTemp: number;
    bottlingPressure: number;
    primingCornSugar: number;
    primingSugar: number;
    primingHoney: number;
    primingDme: number;
    primaryDays: number;
    primaryTemp: number;
    secondaryDays: number;
    secondaryTemp: number;
    tertiaryDays: number;
    tertiaryTemp: number;
    agingDays: number;
    agingTemp: number;
    brewDayDuration: any;
    boilStartTime: any;
    boilEndTime: any;
    /** A mapping of values used to build a recipe timeline / instructions */
    private timelineMap;
    constructor(options?: any);
    /** Export a recipe to JSON, which stores all values which are not
     * easily computed via Recipe.prototype.calculate(). This method
     * gets called when using JSON.stringify(recipe).
     */
    toJSON(): string;
    /** Get the batch size in gallons */
    batchSizeGallons(): number;
    /** Get the boil size in gallons */
    boilSizeGallons(): number;
    add(type: string, values: any): void;
    addFermentable(fermentable: Fermentable): void;
    addSpice(spice: Spice): void;
    addHop(spice: Spice): void;
    addYeast(yeast: Yeast): void;
    /** Get the total weight of grains in kg */
    grainWeight(): number;
    /** Get the total number of whole bottles (i.e. servings) */
    bottleCount(): number;
    /** Get a friendly human-readable color name */
    colorName(): string;
    /** Scale this recipe, keeping gravity and bitterness the same */
    scale(batchSize: any, boilSize: any): void;
    private isValueInArray(value, values);
    /**
     *  Give this recipe a grade based on the completeness and quality
     *  of the recipe, where the larger the grade, the better the
     *  recipe quality. A totally blank recipe will return zero.
     */
    grade(): number;
    calculate(): void;
    /**
     *  Get a timeline as a list of [[time, description], ...] that can be put
     *  into a list or table. If siUnits is true, then use metric units,
     *  otherwise use imperial units.
     *  You MUST call `calculate()` on this recipe before this method.
     */
    timeline(siUnits?: boolean): any[];
}
