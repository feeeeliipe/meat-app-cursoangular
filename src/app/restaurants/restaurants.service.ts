import { Restaurant } from "./restaurant/restaurant.model";

import { MEAT_API } from '../app.api';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {

    constructor(private http: HttpClient) {}

    restaurants(searchTerm?: string): Observable<Restaurant[]> {
      let params: HttpParams = undefined;
      if (searchTerm) {
        params = new HttpParams().set('q', searchTerm);
      }

      return this.http
                 .get<Restaurant[]>(MEAT_API + '/restaurants', {params: params});
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http
               .get<Restaurant>(MEAT_API + "/restaurants/" + id);
    }

    reviewsOfRestaurant(id: String): Observable<any> {
        return this.http.get(MEAT_API + '/restaurants/' + id + '/reviews')
    }

    menuOfRestaurant(id: String): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(MEAT_API + '/restaurants/' + id + '/menu')
    }
}