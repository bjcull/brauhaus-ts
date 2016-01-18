import {Recipe} from '../src/recipe';
import {Fermentable} from '../src/fermentable';
import {Spice} from '../src/spice';
import {Yeast} from '../src/yeast';
import {Mash} from '../src/mash';
import {MashStep, MashStepType} from '../src/mashStep';
import * as should from 'should';

describe('Recipe', () => {
    var fermentable = new Fermentable({
        name: "Pale Malt",
        color: 3,
        yield: 75,
        weight: 4.25
    });
    
    var spice = new Spice({
        name: "Magnum",
        aa: 10,
        form: "pellet",
        time: 60,
        use: "mash",
        weight: 0.020        
    });
    
    var yeast = new Yeast({
        name: "US-05",
        attenuation: 80,
        form: "dry",
        type: "ale"
    });
    
    var recipe = new Recipe({
        name: "Test Recipe",
        description: "A Test Recipe",
        author: "Ben Cull",
        batchSize: 20,
        boilSize: 24,
        primaryTemp: 18,
        primaryDays: 10,
        servingSize: 0.33,
        mashEfficiency: 75,
        agingDays: 14
    });
    
    var mash = new Mash({
        name: "mash",
        grainTemp: 24,
        ph: 5.3,
        spargeTemp: 78,
        steps: [
            new MashStep({
                name: "Sach Rest",
                temp: 66,
                time: 60,
                type: MashStepType.Infusion,
                waterRatio: 3
            })
        ]        
    });
    
    recipe.addFermentable(fermentable);
    recipe.addSpice(spice);
    recipe.addYeast(yeast);
    recipe.mash = mash;
    
    
    recipe.calculate();    
    console.log(recipe.timeline());
    
    it("Should construct a recipe", () => {
        should(fermentable.name).equal('Pale Malt', "Should be able to set paramaters");        
    });
    
    // recipe.addFermentable(new Fermentable({
    //     name: 'Golden Promise',
    //     
    // }));
});
