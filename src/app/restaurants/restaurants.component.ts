import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))  
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden';

  restaurants: Restaurant[]

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantService: RestaurantService,
              private fb: FormBuilder) {
    this.searchControl = this.fb.control(''); 
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
  }

  enableBar() {
    if (this.searchBarState === 'hidden') {
      this.searchBarState = 'visible';
    } else {
      this.searchBarState = 'hidden';
    }
  }

  ngOnInit() {
    this.restaurantService
        .restaurants()
        .subscribe(restaurants => this.restaurants = restaurants);
  
    this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .do(searchTerm => console.log('q = ' + searchTerm))
        .switchMap(searchTerm => 
          this.restaurantService.restaurants(searchTerm))
          .subscribe(restaurants => this.restaurants = restaurants)
  
  }

}
