import {Globals} from './globals';

export interface IPoundsAndOunces {
    pounds: number;
    ounces: number;
}

export interface IRGB {
    r: number;
    g: number;
    b: number;
}

export class Utils {
    /**
     * Duration string to number of minutes. This will convert strings like
     * '1 hour' into 60.0 or '35 min' into 35.0. Compound strings also work,
     * for example '1 hour 5 minutes' will become 65.0.
     */
    static parseDuration(value: string) {
        var duration = 0;

        var weeks = value.match(/(\d+)\s*w/i);
        var days = value.match(/(\d+)\s*d/i);
        var hours = value.match(/(\d+)\s*h/i);
        var min = value.match(/(\d+)\s*m/i);
        var sec = value.match(/(\d+)\s*s/i);

        var factors = [
            { unit: weeks, factor: 7 * 60 * 24 },
            { unit: days, factor: 60 * 24 },
            { unit: hours, factor: 60 },
            { unit: min, factor: 1 },
            { unit: sec, factor: 1.0 / 60 }
        ];

        for (let i = 0; i < factors.length; i++) {
            var unit = '0';
            if (factors[i].unit) {
                unit = factors[i].unit[1];
            }

            duration += (parseInt(unit) * factors[i].factor);
        }

        return duration;
    }
        
    /**
     * Return a human-friendly duration like '2 weeks' or '3 hours 12 minutes'
     * from a number of minutes. If approximate is given, then only the two
     * largest factors are included (e.g. weeks & days or days & hours) rather
     * than all possible pieces. For example '1 day 2 hours 5 minutes' would
     * become '1 day 2 hours'
     */
    static displayDuration(minutes: number, approximate?: number) {
        var durations = [];

        var factors = [
            { label: 'month', factor: 30 * 60 * 24 },
            { label: 'week', factor: 7 * 60 * 24 },
            { label: 'day', factor: 60 * 24 },
            { label: 'hour', factor: 60 },
            { label: 'minute', factor: 1 }
        ];

        var count = 0;

        for (let i = 0; i < factors.length; i++) {
            var amount = 0;
            var label = factors[i].label;
            var factor = factors[i].factor;

            if (factor == 1 || (approximate && count == approximate - 1)) {
                // Round the last item
                amount = Math.round(minutes / factor);
            }
            else {
                // Get the biggest whole number (e.g. 1 day)
                amount = Math.floor(minutes / factor);
            }
                
            // Set the remaining minutes
            minutes = minutes % factor;

            // Increment count of factors seen
            if (amount > 0 || count > 0) {
                count++;
            }

            if (approximate && count > approximate) {
                break;
            }

            if (amount > 0) {
                durations.push(`${amount} ${label}${(amount != 1 ? 's' : '')}`);
            }
        }

        if (!durations.length) {
            durations = ['start']
        }

        return durations.join(' ');
    }
        
    /** Convert Kilograms to Pounds */
    static kgToLb(kg: number) {
        return kg * 2.20462;
    }
        
    /** Convert Pounds to Kilograms */
    static lbToKg(lb: number) {
        return lb / 2.20462;
    }
        
    /** Convert Kilograms to Pounds and Ounces */
    static kgToLbOz(kg: number): IPoundsAndOunces {
        var lb = this.kgToLb(kg);
        // Returns an anonymous object with lb and oz properties
        return { pounds: Math.floor(lb), ounces: (lb - Math.floor(lb)) * 16.0 }
    }
        
    /** Convert Pounds and Ounces to Kilograms */
    static lbOzToKg(value: IPoundsAndOunces) {
        return this.lbToKg(value.pounds + (value.ounces / 16.0));
    }
        
    /** Convert Liters to gallons */
    static litersToGallons(liters: number) {
        return liters * 0.264172;
    }
        
    /** Convert Gollans to Litres */
    static gallonsToLiters(gallons: number) {
        return gallons / 0.264172;
    }        

    /** Convert Litres per Kilogram to Quarts per Pound */
    static litersPerKgToQuartsPerLb(litersPerKg: number) {
        return litersPerKg * 0.479305709;
    }

    /** Convert Quarts per Pound to Litres per Kilogram */
    static quartsPerLbToLitersPerKg(quartsPerLb: number) {
        return quartsPerLb / 0.479305709;
    }        
        
    /** Convert Celcius to Fahrenheit */
    static cToF(celcius: number) {
        return (celcius * 1.8) + 32;
    }
        
    /** Convert Fahrenheit to Celcius */
    static fToC(fahrenheit: number) {
        return (fahrenheit - 32) / 1.8;
    }
        
    /** Convert Yield Percentage to Parts per gallon */
    static yieldToPpg(yieldPercentage: number) {
        return yieldPercentage * 0.46214;
    }

    /** Convetr Parts per Gallon to Yield Percentage */
    static ppgToYield(ppg: number) {
        return ppg * 2.16385;
    }        
        
    /** Convert SRM to EBC */
    static srmToEbc(srm: number) {
        return srm * 1.97;
    }
        
    /** Convert EBC to SRM */
    static ebcToSrm(ebc: number) {
        return ebc * 0.508;
    }
        
    /** Convert SRM to Lovibond */
    static srmToLovibond(srm: number) {
        (srm + 0.76) / 1.3546;
    }
        
    /** Convert Lovibond to SRM */
    static lovibondToSrm(lovibond: number) {
        return 1.3546 * lovibond - 0.76;
    }
        
    /** Convert SRM color values to {r, g, b} triplets */
    static srmToRgb(srm: number): IRGB {
        var r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srm))));
        var g = Math.round(Math.min(255, Math.max(0, 245 * Math.pow(0.88, srm))));
        var b = Math.round(Math.min(255, Math.max(0, 220 * Math.pow(0.7, srm))));

        return { r, g, b };
    }
        
    /** Convert SRM color values to CSS-friendly strings */
    static srmToCss(srm: number) {
        var rgb = this.srmToRgb(srm);
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }

    /** Convert SRM color values into friendly names */
    static srmToName(srm: number): string {
        var color = Globals.COLOR_NAMES[0].name;

        for (let i = 0; i < Globals.COLOR_NAMES.length; i++) {
            if (Globals.COLOR_NAMES[i].color <= srm) {
                color = Globals.COLOR_NAMES[i].name;
            }
        }

        return color;
    }
        
    /** 
     * Get the approximate time to change a volume of liquid in liters by a
     * number of degrees celcius. Degrees defaults to 80 which is about
     * the temperature difference between tap water and boiling.
     * Input energy is set via `Brauhaus.BURNER_ENERGY` and is measured in
     * kilojoules per hour. It defaults to an average stovetop burner.
     */
    static timeToHeat(liters: number, degrees: number = 80) {
        var kj = 4.19 * liters * degrees;
        return (kj / Globals.BURNER_ENERGY) * 60;
    }
}
