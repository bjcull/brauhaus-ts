import {Recipe} from '../src/recipe';
import {Fermentable} from '../src/fermentable';
import {Spice} from '../src/spice';
import {Yeast} from '../src/yeast';
import {Mash} from '../src/mash';
import {MashStep, MashStepType} from '../src/mashStep';
import * as should from 'should';

describe('Recipe', () => {
    var fermentable: Fermentable;
    var spice: Spice;
    var yeast: Yeast;
    var recipe: Recipe;
    var mash: Mash;
    
    before(() => {
        fermentable = new Fermentable({
            name: "Pale Malt",
            color: 3,
            yield: 75,
            weight: 4.25
        });

        spice = new Spice({
            name: "Magnum",
            aa: 10,
            form: "pellet",
            time: 60,
            use: "mash",
            weight: 0.020
        });

        yeast = new Yeast({
            name: "US-05",
            attenuation: 80,
            form: "dry",
            type: "ale"
        });

        recipe = new Recipe({
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

        mash = new Mash({
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
    });
    
    describe("#setup", () => {
        it("Should construct a recipe", () => {
            should(fermentable.name).equal('Pale Malt', "Should be able to set paramaters");
        });
    });    
    
    describe("#calculations", () => {
        it("Should calculate OG", () => {
            var approx = recipe.og.toFixed(3);
            should(recipe.og).equal(1.0461001119418645, "Original Gravity");
        });
    });
    
    describe("#serialization", () => {
        it("Should serialize and deserialize to the same object", () => {
            var recipeJson = recipe.toJSON();
            var newRecipe = new Recipe(recipeJson);
            
            should(newRecipe.fermentables.length).equal(recipe.fermentables.length);
            should(newRecipe.spices.length).equal(recipe.spices.length);
            should(newRecipe.yeast.length).equal(recipe.yeast.length);
            should(newRecipe.mash.steps.length).equal(recipe.mash.steps.length);                       
        });
        it("Should serialize and deserialize with the same brew log", () => {
            var recipeJson = recipe.toJSON();
            var newRecipe = new Recipe(recipeJson);
            
            should(newRecipe.timeline()).equal(recipe.timeline());
        });
    });
});
