import { Component  } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent  {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private slService: ShoppingListService  ){};

  onSaveData() {
    if (this.recipeService.recipesChanged){
      this.dataStorageService.storeRecipes()}
    if (this.slService.ingredientChanged){
      this.dataStorageService.storeIngredients();}
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    this.dataStorageService.fetchIngredients().subscribe();
  }
}
