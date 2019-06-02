import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations'


@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('rowAdd', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('500ms 0s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(30px)', offset: 0.7}),
        style({opacity: 1, transform: 'translateX(0px)', offset: 1})
      ]))),
      transition('ready => void', animate('500ms 0s ease-out', keyframes([
        style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2}),
        style({opacity: 0, transform: 'translateX(30px)', offset: 1})
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(private service: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.service.items;
  }

  total(): number{
    return this.service.total();
  }
  
  clear() {
    this.service.clear();
  }

  removeItem(item: any) {
    this.service.removeItem(item);
  }

  addItem(item: any) {
    this.service.addItem(item);
  }

}
