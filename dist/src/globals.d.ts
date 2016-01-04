export interface BeerColor {
    color: number;
    name: string;
}
export declare class Globals {
    /** Hyperbolic tangent approximation */
    static tanh(value: number): number;
    /** Room temperature in degrees C */
    static ROOM_TEMP: number;
    /**
     * Energy output of the stovetop or gas burner in kilojoules per hour. Default
     * is based on a large stovetop burner that would put out 2,500 watts.
     */
    static BURNER_ENERGY: number;
    /** Average mash heat loss per hour in degrees C */
    static MASH_HEAT_LOSS: number;
    /** Friendly beer color names and their respective SRM values */
    static COLOR_NAMES: {
        color: number;
        name: string;
    }[];
    /** Relative sugar densities used to calculate volume from weights */
    static RELATIVE_SUGAR_DENSITY: {
        cornSugar: number;
        dme: number;
        honey: number;
        sugar: number;
    };
}
