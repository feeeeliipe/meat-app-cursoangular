import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from '../order/order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;


  paymentOptions: RadioOption[] = [
    {label:'Dinheiro', value:'MONEY'},
    {label:'Cartão de Crédito', value:'CREDITCARD'},
    {label:'Cartão de Débito', value:'DEBITCARD'},
  ];

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
  }
  
  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
      this.orderService.remove(item);
  }

  checkoutOrder(order: Order) {
    order.orderItems = this.cartItems()
                       .map((item:CartItem) => 
                       new OrderItem(item.quantity, 
                                     item.menuItem.id))

    this.orderService.checkoutOrder(order)
        .subscribe((orderId: string) => {
          this.router.navigate(['/order-summary']);  
          console.log("Compra:" + orderId);
          this.orderService.clear();
        });                               
    
  }
}
