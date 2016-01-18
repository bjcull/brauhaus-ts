var recipe_1 = require('../src/recipe');
var fermentable_1 = require('../src/fermentable');
var spice_1 = require('../src/spice');
var yeast_1 = require('../src/yeast');
var mash_1 = require('../src/mash');
var mashStep_1 = require('../src/mashStep');
var should = require('should');
describe('Recipe', function () {
    var fermentable = new fermentable_1.Fermentable({
        name: "Pale Malt",
        color: 3,
        yield: 75,
        weight: 4.25
    });
    var spice = new spice_1.Spice({
        name: "Magnum",
        aa: 10,
        form: "pellet",
        time: 60,
        use: "mash",
        weight: 0.020
    });
    var yeast = new yeast_1.Yeast({
        name: "US-05",
        attenuation: 80,
        form: "dry",
        type: "ale"
    });
    var recipe = new recipe_1.Recipe({
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
    var mash = new mash_1.Mash({
        name: "mash",
        grainTemp: 24,
        ph: 5.3,
        spargeTemp: 78,
        steps: [
            new mashStep_1.MashStep({
                name: "Sach Rest",
                temp: 66,
                time: 60,
                type: mashStep_1.MashStepType.Infusion,
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
    it("Should construct a recipe", function () {
        should(fermentable.name).equal('Pale Malt', "Should be able to set paramaters");
    });
    // recipe.addFermentable(new Fermentable({
    //     name: 'Golden Promise',
    //     
    // }));
});
//# sourceMappingURL=recipeTest.js.map