import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { RecipeService } from '../components/recipes/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import { ShoppingListService } from '../components/shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { of } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';



@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,
              private slService: ShoppingListService,
              private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://leah-recipe-book-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  //storeIngredients
  storeIngredients() {
    const ingredients = this.slService.getIngredients();
    this.http
      .put(
        'https://leah-recipe-book-default-rtdb.firebaseio.com/ingredients.json',
        ingredients
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://leah-recipe-book-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchIngredients() {
    return this.http
      .get<Ingredient[]>(
        'https://leah-recipe-book-default-rtdb.firebaseio.com/ingredients.json',
      )
      .pipe(
        map(responseData => {
        const ingredientsArray = [];
        for (const ingredients in responseData){
          ingredientsArray.push({...responseData[ingredients]});
        }
        this.slService.setIngredients(responseData);
        return responseData;
      }
      ));
  }


  // fetchIngredients() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http.get<Ingredient[]>(
  //         'https://leah-recipe-book-default-rtdb.firebaseio.com/ingredients.json',
  //         {
  //           params: new HttpParams().set('auth', user.token)
  //         }
  //       );
  //     }),
  //   map(responseData => {
  //       const ingredientsArray = [];
  //       for (const ingredients in responseData){
  //         ingredientsArray.push({...responseData[ingredients]});
  //       }
  //       this.slService.setIngredients(responseData);
  //       return responseData;
  //     }
  //     ))
  // }
}
