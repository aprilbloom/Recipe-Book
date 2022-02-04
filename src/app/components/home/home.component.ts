import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor() { }

  ngOnInit(): void {
  }

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
