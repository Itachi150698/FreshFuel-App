import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag'; // Import the Tag class

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags?: Tag[]; // Define tags property to hold tags data

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) { }

  foods: Food[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let foodsObservable: Observable<Food[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      else
        foodsObservable = this.foodService.getAll();

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });

    this.foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }
}
