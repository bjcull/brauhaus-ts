"use strict";
var recipe_1 = require('../src/recipe');
var fermentable_1 = require('../src/fermentable');
var spice_1 = require('../src/spice');
var yeast_1 = require('../src/yeast');
var mash_1 = require('../src/mash');
var mashStep_1 = require('../src/mashStep');
var should = require('should');
describe('Recipe', function () {
    var fermentable;
    var spice;
    var yeast;
    var recipe;
    var mash;
    before(function () {
        fermentable = new fermentable_1.Fermentable({
            name: "Pale Malt",
            color: 3,
            yield: 75,
            weight: 4.25
        });
        spice = new spice_1.Spice({
            name: "Magnum",
            aa: 10,
            form: "pellet",
            time: 60,
            use: "mash",
            weight: 0.020
        });
        yeast = new yeast_1.Yeast({
            name: "American Ale",
            attenuation: 80,
            form: "dry",
            type: "ale",
            lab: "SafBrew",
            code: "US-05"
        });
        recipe = new recipe_1.Recipe({
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
        mash = new mash_1.Mash({
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
    });
    describe("#setup", function () {
        it("Should construct a recipe", function () {
            should(fermentable.name).equal('Pale Malt', "Should be able to set paramaters");
        });
    });
    describe("#calculations", function () {
        it("Should calculate OG", function () {
            var approx = recipe.og.toFixed(3);
            should(recipe.og).equal(1.0461001119418645, "Original Gravity");
        });
    });
    describe("#serialization", function () {
        it("Should serialize and deserialize to the same object", function () {
            var recipeJson = recipe.toJSON();
            var newRecipe = new recipe_1.Recipe(recipeJson);
            should(newRecipe.fermentables.length).equal(recipe.fermentables.length);
            should(newRecipe.spices.length).equal(recipe.spices.length);
            should(newRecipe.yeast.length).equal(recipe.yeast.length);
            should(newRecipe.mash.steps.length).equal(recipe.mash.steps.length);
        });
        it("Should serialize and deserialize with the same brew log", function () {
            var recipeJson = JSON.stringify(recipe);
            var newRecipe = new recipe_1.Recipe(recipeJson);
            newRecipe.calculate();
            should(newRecipe.timeline().join(';')).equal(recipe.timeline().join(';'));
        });
    });
});
//# sourceMappingURL=recipeTest.js.map