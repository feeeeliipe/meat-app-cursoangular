import {Routes} from '@angular/router'
import { HomeComponent } from './home/home.component'
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const ROUTES: Routes = [
    {path:'', component: HomeComponent},
    {path:'restaurants', component: RestaurantsComponent},
    {path:'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent},
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
        ]
    },
    {path:'order-summary', component: OrderSummaryComponent},

    // LAZY LOADING 
    {path:'about', loadChildren: './about/about.module#AboutModule'},
    {path:'order', loadChildren: './order/order.module#OrderModule'},
    
    // WILD CARD ROUTE - SEMPRE A ULTIMA ROTA 
    {path:'**', component: NotFoundComponent},

]