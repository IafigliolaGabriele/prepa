import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.css']
})
export class ShoppingHistoryComponent implements OnInit {

  constructor(
    private database: DatabaseService,
    private auth: AuthService
  ) { }

  db:any=[];
  filteredDb:any = [];

  ngOnInit() {
    this.database.getUserOrders().subscribe(orders=>{
      this.filteredDb = [];
      orders.forEach(element => {
        this.filteredDb.push(element.payload.doc.data());
      });
    })
  }

  buildCart(cart){
    console.log("cart")
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
      userInfo = {};
      console.log("Cart",userInfo);
      userInfo.cart = cart;
      localStorage.setItem("userInfo",JSON.stringify(userInfo)); 
    }else{
      userInfo.cart = cart;
      localStorage.setItem("userInfo",JSON.stringify(userInfo)); 
    }
  }

}
