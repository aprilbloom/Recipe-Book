import { Component, OnDestroy, OnInit  } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  collapsed = true;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private slService: ShoppingListService,
              private authService: AuthService,  ){};

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

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

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
