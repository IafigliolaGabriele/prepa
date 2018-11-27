import { Component, OnInit , TemplateRef} from '@angular/core';
import {NetworkService} from '../../services/network.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatabaseService} from '../../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import {style} from 'typestyle';

class Food {
  id?: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

const insideFood = style({
  display: 'flex',
  border: '10px dotted blue',
  flexDirection: 'column',
});

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  classImage = 'foodImage'
  className = 'insideFood';
  className2 = 'foodContent';
  insideFood2 = 'insideFood';
  insideFood = style({
    display: 'flex',
    border: '10px dotted blue',
    flexDirection: 'column',
  });
  modalRef: BsModalRef;
  db: Observable<any[]>
  filteredDb: Array<Food>;
  texto: string = "Texto";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  foodForm: FormGroup;
  urlReady = false;
  update: boolean = false;
  constructor(
    private datab: AngularFireDatabase,
    private afd: AngularFirestore,
    private network: NetworkService,
    private modalService: BsModalService,
    private database: DatabaseService,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.filteredDb=[]
      this.foodForm = fb.group({
        name: ["",[Validators.required]],
        description: ["",[Validators.required]],
        image_url: ["",[Validators.required]],
        available: [true],
        price: [100,[Validators.required]]
      })
   }

  openModal(template: TemplateRef<any>) {
    this.update = false;
    this.modalRef = this.modalService.show(template);
  }

  seeCart(){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
      console.log("Cart",userInfo.cart);
    }else{
      console.log("Empty")
    }
  }
  

  addToCart(food){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
      console.log("Cart",userInfo);
      userInfo.cart.push(food);
      localStorage.setItem("userInfo",JSON.stringify(userInfo)); 
    }else{
      console.log(":oading",food)
      let cart = [];
      cart.push(food);
      userInfo = {
        cart: cart
      }
      localStorage.setItem("userInfo",JSON.stringify(userInfo));
    }
  //  this.filteredDb = this.database.getAllPersons()
  }
    
/**
* Function to close an specific modal
* @param {TemplateRef<any>} template The ref of the modal to be open
* @author Gabriele Iafigliola
*/
closeModal() {
  this.foodForm.reset();
  this.modalRef.hide();
}

  onSubmit(value){
    console.log("Form",value)
    this.foodForm.value.image_url = this.downloadURL;
    this.database.addFood(this.foodForm.value)
  }

  addFood(){
    this.foodForm.value.image_url = this.downloadURL;
    if(this.foodForm.value.available == "true"){
      this.foodForm.value.available = true;
    }else{
      this.foodForm.value.available = false;
    }
    delete this.foodForm.value.id
    console.log("Form",this.foodForm.value)
    this.database.addFood(this.foodForm.value)
  }


  orderCart(){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let orderInfo = {
      total: 0,
      date: Date.now(),
      resume: "",
      cart: userInfo.cart
    }
    userInfo.cart.forEach((food:Food) => {
      food['ingredients'].forEach(ingredient => {
        orderInfo.total = orderInfo.total + (ingredient.price*ingredient.quantity)
      });
        orderInfo.total = orderInfo.total + food.price;
        orderInfo.resume = orderInfo.resume.concat(food.name).concat(";")
    });
    this.database.addOrder(orderInfo);
  }

  /**
  * Function to open an specific modal
  * @param {TemplateRef<any>} template The ref of the modal to be open
  * @author Gabriele Iafigliola
  */
  openModalWithInfo(template: TemplateRef<any>, food) {
    this.update = true;
    console.log("food",food);
    this.foodForm = this.fb.group({
      name: [food.name,[Validators.required]],
      description: [food.description,[Validators.required]],
      //image_url: [food.image_url,[Validators.required]],
      available: [food.available,[Validators.required]],
      id: [food.id],
    })
    this.modalRef = this.modalService.show(template);
  }

  /**
  * Function to update a food from the database
  * @author Gabriele Iafigliola
  */  
  updateFood(){
    let id = this.foodForm.value.id;
    if(this.foodForm.value.available == "true"){
      this.foodForm.value.available = true;
    }else{
      this.foodForm.value.available = false;
    }
    delete this.foodForm.value.id
    //this.database.deleteLastPerson();
    console.log("Food-->",this.foodForm.value);
    let response = this.database.updateFoodByID(id,this.foodForm.value);
    response.then(response=>{
      console.log("Success")
    }).catch(err=>{
      console.log("Failure",err)
    })
  }


  addIngredient(id,ingredient){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let index = this.filteredDb.findIndex(food=>{
      return food.id == id
    })
    if(userInfo){
      for(let i=0;i<userInfo.cart.length;i++){
        if(userInfo.cart[i].id == id){
          for(let j=0;j<userInfo.cart[i].ingredients.length;j++){
            if(userInfo.cart[i].ingredients[j].id==ingredient.id){
              if(userInfo.cart[i].ingredients[j].quantity<10)
                userInfo.cart[i].ingredients[j].quantity = userInfo.cart[i].ingredients[j].quantity + 1;
                this.filteredDb[index]['ingredients'][j]['quantity']= userInfo.cart[i].ingredients[j].quantity;
              }
          }
          localStorage.setItem("userInfo",JSON.stringify(userInfo)); 
        }
      }
    }else{
      console.log("Empty")
    }
  }

  removeIngredient(id,ingredient){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let index = this.filteredDb.findIndex(food=>{
      return food.id == id
    })
    console.log("Index",index)
    if(userInfo){
      for(let i=0;i<userInfo.cart.length;i++){
        if(userInfo.cart[i].id == id){
          for(let j=0;j<userInfo.cart[i].ingredients.length;j++){
            console.log("userInfo.cart[i]",userInfo.cart[i])
            if(userInfo.cart[i].ingredients[j].id==ingredient.id){
              if(userInfo.cart[i].ingredients[j].quantity > 0)
                userInfo.cart[i].ingredients[j].quantity = userInfo.cart[i].ingredients[j].quantity - 1;
                this.filteredDb[index]['ingredients'][j]['quantity']= userInfo.cart[i].ingredients[j].quantity;
            }
          }
          
          localStorage.setItem("userInfo",JSON.stringify(userInfo)); 
        }
      }
    }else{
      console.log("Empty")
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'foodImages/'.concat(file.name);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log("entre", file)
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url=>{
            this.downloadURL = url;  
            console.log("URL",this.downloadURL)
            this.urlReady = true;
          })
          ;
        } )
     )
    .subscribe()
  }

  makeResponsive(){
    if(this.className=='insideFood'){
      this.className = 'responsive-insideFood';
      this.className2 = 'responsive-foodContent';
      this.classImage = 'responsive-foodImage'
    }else{
      this.className = 'insideFood';
      this.className2 = 'foodContent';
      this.classImage = 'foodImage'
    }
  }


  ngOnInit() {
    console.log("[Entre]");
    // let list = document.getElementsByClassName("insideFood");
    // for (let item of list) {
    //     console.log(item.id);
    // }
    this.db = this.database.getAllFoods();
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.db.subscribe(products=>{
      products.forEach(product =>{
        for(let i = 0; i< userInfo.cart.length; i++){
          console.log("ID",product.payload.doc.id)
          if(userInfo.cart[i].id == product.payload.doc.id){
            userInfo.cart[i].description= product.payload.doc.data().description;
            userInfo.cart[i].name = product.payload.doc.data().name;
            userInfo.cart[i].price = product.payload.doc.data().price;
          }
        }
      })
       this.filteredDb = [];
       this.filteredDb = userInfo.cart;
       console.log("DBFiltrada2",this.filteredDb);
    })

    console.log("DBFiltrada",this.filteredDb);
  }

}
