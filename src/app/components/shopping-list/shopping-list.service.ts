import { EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService{
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  };

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredient: Ingredient[]){
    this.ingredients.push(...this.ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

}
