var BeerXml = (function () {
    function BeerXml() {
    }
    BeerXml.ExportRecipe = function (recipe) {
        var recipeXml = "<RECIPE>"
            + "<NAME>" + recipe.name + "</NAME>"
            + "<VERSION>1</VERSION>"
            + "<TYPE>All Grain</TYPE>"
            + "<STYLE></STYLE>"
            + "<BREWER>" + recipe.author + "</BREWER>"
            + "<BATCH_SIZE>" + recipe.batchSize + "</BATCH_SIZE>"
            + "<BOIL_SIZE>" + recipe.boilSize + "</BOIL_SIZE>"
            + "<BOIL_TIME>" + recipe.boilTime + "</BOIL_TIME>"
            + "<EFFICIENCY>" + recipe.mashEfficiency + "</EFFICIENCY>"
            + "<HOPS>" + this.ExportHops(recipe.spices) + "</HOPS>"
            + "<FERMENTABLES>" + this.ExportFermentables(recipe.fermentables) + "</FERMENTABLES>"
            + "<MISCS></MISCS>"
            + "<YEASTS>" + this.ExportYeast(recipe.yeast) + "</YEASTS>"
            + "<WATERS></WATERS>"
            + "<MASH></MASH>"
            + "</RECIPE>";
        return recipeXml;
    };
    BeerXml.ExportHops = function (hops) {
        var list = "";
        for (var i = 0; i < hops.length; i++) {
            var hop = hops[i];
            var hopXml = "<HOP>"
                + "<NAME>" + hop.name + "</NAME>"
                + "<VERSION>1</VERSION>"
                + "<ALPHA>" + hop.aa + "</ALPHA>"
                + "<AMOUNT>" + hop.weight + "</AMOUNT>"
                + "<USE>" + hop.use + "</USE>"
                + "<TIME>" + hop.time + "</TIME>"
                + "</HOP>";
            list += hopXml;
        }
        return list;
    };
    BeerXml.ExportFermentables = function (fermentables) {
        var list = "";
        for (var i = 0; i < fermentables.length; i++) {
            var f = fermentables[i];
            var fermentableXml = "<FERMENTABLE>"
                + "<NAME>" + f.name + "</NAME>"
                + "<VERSION>1</VERSION>"
                + "<TYPE>" + f.type() + "</TYPE>"
                + "<AMOUNT>" + f.weight + "</AMOUNT>"
                + "<YIELD>" + f.yield + "</YIELD>"
                + "<COLOR>" + f.color + "</COLOR>"
                + "</FERMENTABLE>";
            list += fermentableXml;
        }
        return list;
    };
    BeerXml.ExportYeast = function (yeast) {
        var list = "";
        for (var i = 0; i < yeast.length; i++) {
            var y = yeast[i];
            var yeastXml = "<YEAST>"
                + "<NAME>" + y.name + "</NAME>"
                + "<VERSION>1</VERSION>"
                + "<TYPE>" + y.type + "</TYPE>"
                + "<FORM>" + y.form + "</FORM>"
                + "<AMOUNT>0.125</AMOUNT>"
                + "<ATTENUATION>" + y.attenuation + "</ATTENUATION>"
                + "</YEAST>";
            list += yeastXml;
        }
        return list;
    };
    return BeerXml;
})();
exports.BeerXml = BeerXml;
//# sourceMappingURL=beerxml.js.map