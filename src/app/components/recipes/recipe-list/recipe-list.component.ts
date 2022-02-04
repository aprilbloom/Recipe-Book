import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe} from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Adobo', 'Favorite filipino recipe' , 'https://cdn-icons-png.flaticon.com/512/2005/2005938.png'),
    new Recipe('Menudo', 'Favorite filipino recipe1' , 'https://cdn-icons-png.flaticon.com/512/2005/2005938.png'),
    new Recipe('Afritada', 'Favorite filipino recipe2' , 'https://cdn-icons-png.flaticon.com/512/2005/2005938.png'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
