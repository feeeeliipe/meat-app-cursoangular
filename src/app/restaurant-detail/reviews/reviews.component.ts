import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestaurantService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;  


  constructor(private service: RestaurantService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.reviews = this.service
                         .reviewsOfRestaurant(
                           this.route
                               .parent
                               .snapshot
                               .params['id']);
  }

}
