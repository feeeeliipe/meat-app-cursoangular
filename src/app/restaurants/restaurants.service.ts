import { Restaurant } from "./restaurant/restaurant.model";

import { MEAT_API } from '../app.api';
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorHandler } from '../app.error-handler';
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {

    constructor(private http: Http) {}

    restaurants(searchTerm?: string): Observable<Restaurant[]> {
      return this.http
                 .get(MEAT_API + '/restaurants', {params: {q: searchTerm}})
                 .map(response => response.json())
                 .catch(ErrorHandler.handleError);
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http
               .get(MEAT_API + "/restaurants/" + id)
               .map(response => response.json())
               .catch(ErrorHandler.handleError);  
    }

    reviewsOfRestaurant(id: String): Observable<any> {
        return this.http.get(MEAT_API + '/restaurants/' + id + '/reviews')
        .map(response => response.json())
        .catch(ErrorHandler.handleError);  
    }

    menuOfRestaurant(id: String): Observable<MenuItem[]> {
        return this.http.get(MEAT_API + '/restaurants/' + id + '/menu')
        .map(response => response.json())
        .catch(ErrorHandler.handleError);         
    }
}