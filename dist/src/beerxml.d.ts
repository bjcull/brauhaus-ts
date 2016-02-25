import { Recipe } from './recipe';
export declare class BeerXml {
    static ExportRecipe(recipe: Recipe): string;
    private static ExportHops(hops);
    private static ExportFermentables(fermentables);
    private static ExportYeast(yeast);
}
