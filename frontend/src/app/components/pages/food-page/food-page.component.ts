import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag'; // Import Tag model if it's defined somewhere

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  tags?: Tag[];
  searchTerm = '';
   

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        foodService.getFoodById(params.id).subscribe(serverFood => {
          this.food = serverFood;
        });
      }
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
      }
    });

    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }


}
