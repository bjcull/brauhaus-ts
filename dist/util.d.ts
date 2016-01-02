export interface IPoundsAndOunces {
    pounds: number;
    ounces: number;
}
export interface IRGB {
    r: number;
    g: number;
    b: number;
}
export declare class Utils {
    /**
     * Duration string to number of minutes. This will convert strings like
     * '1 hour' into 60.0 or '35 min' into 35.0. Compound strings also work,
     * for example '1 hour 5 minutes' will become 65.0.
     */
    static parseDuration(value: string): number;
    /**
     * Return a human-friendly duration like '2 weeks' or '3 hours 12 minutes'
     * from a number of minutes. If approximate is given, then only the two
     * largest factors are included (e.g. weeks & days or days & hours) rather
     * than all possible pieces. For example '1 day 2 hours 5 minutes' would
     * become '1 day 2 hours'
     */
    static displayDuration(minutes: number, approximate?: number): string;
    /** Convert Kilograms to Pounds */
    static kgToLb(kg: number): number;
    /** Convert Pounds to Kilograms */
    static lbToKg(lb: number): number;
    /** Convert Kilograms to Pounds and Ounces */
    static kgToLbOz(kg: number): IPoundsAndOunces;
    /** Convert Pounds and Ounces to Kilograms */
    static lbOzToKg(value: IPoundsAndOunces): number;
    /** Convert Liters to gallons */
    static litersToGallons(liters: number): number;
    /** Convert Gollans to Litres */
    static gallonsToLiters(gallons: number): number;
    /** Convert Litres per Kilogram to Quarts per Pound */
    static litersPerKgToQuartsPerLb(litersPerKg: number): number;
    /** Convert Quarts per Pound to Litres per Kilogram */
    static quartsPerLbToLitersPerKg(quartsPerLb: number): number;
    /** Convert Celcius to Fahrenheit */
    static cToF(celcius: number): number;
    /** Convert Fahrenheit to Celcius */
    static fToC(fahrenheit: number): number;
    /** Convert Yield Percentage to Parts per gallon */
    static yieldToPpg(yieldPercentage: number): number;
    /** Convetr Parts per Gallon to Yield Percentage */
    static ppgToYield(ppg: number): number;
    /** Convert SRM to EBC */
    static srmToEbc(srm: number): number;
    /** Convert EBC to SRM */
    static ebcToSrm(ebc: number): number;
    /** Convert SRM to Lovibond */
    static srmToLovibond(srm: number): void;
    /** Convert Lovibond to SRM */
    static lovibondToSrm(lovibond: number): number;
    /** Convert SRM color values to {r, g, b} triplets */
    static srmToRgb(srm: number): IRGB;
    /** Convert SRM color values to CSS-friendly strings */
    static srmToCss(srm: number): string;
    /** Convert SRM color values into friendly names */
    static srmToName(srm: number): string;
    /**
     * Get the approximate time to change a volume of liquid in liters by a
     * number of degrees celcius. Degrees defaults to 80 which is about
     * the temperature difference between tap water and boiling.
     * Input energy is set via `Brauhaus.BURNER_ENERGY` and is measured in
     * kilojoules per hour. It defaults to an average stovetop burner.
     */
    static timeToHeat(liters: number, degrees?: number): number;
}
