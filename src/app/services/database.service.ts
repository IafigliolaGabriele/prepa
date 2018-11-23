import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';


class Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
}

class Food {
  key?: string;
  name: string;
  description: string;
  image_url: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  personRef: AngularFirestoreCollection<Person>
  foodRef: AngularFirestoreCollection<Food>
  orderRef: AngularFirestoreCollection<Food>
  ingredientsRef: AngularFirestoreCollection<Food>
  
  constructor(
    private aft: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthService) { 
    this.personRef = this.aft.collection('persons')
    this.foodRef = this.aft.collection('foods')
    this.orderRef = this.aft.collection('orders')
    this.ingredientsRef = this.aft.collection('ingredients')
  }

  getAllPersons(){
     return this.personRef.snapshotChanges();
  }

  getAllFoods(){
    return this.foodRef.snapshotChanges();
 }

  getPersonByID(id){
    return this.aft.collection('persons').doc(id).valueChanges()
  }

  getFoodByID(id){
    return this.aft.collection('foods').doc(id).valueChanges()
  }

  updatePersonByID(id,newData){
    return this.aft.collection('persons').doc(id).update(newData);
  }

  updateFoodByID(id,newData){
    return this.aft.collection('foods').doc(id).update(newData);
  }

  deletePersonByID(id){
    return this.aft.collection('persons').doc(id).delete();
  }

  deleteFoodByID(id){
    return this.aft.collection('foods').doc(id).delete();
  }
  
  getPersonByGender(gender){
    return this.aft.collection('persons', ref=>ref.where('gender','==',gender)).valueChanges()
  }

  getAvailableFoods(){
    return this.aft.collection('foods', ref=>ref.where('available','==',true)).snapshotChanges()
  }

  addFood(food){
    this.aft.collection('foods').add(food).then(data=>{
      console.log("Comida agregada",data)
    });
  }

  addOrder(orderInfo){
    orderInfo.userKey = this.auth.userKey;
    this.aft.collection('orders').add(orderInfo).then(data=>{
      console.log("Orden agregada",data)
    });
  }

  getUserOrders(){
     return this.aft.collection('orders', ref=>ref.where('userKey','==',this.auth.userKey)).snapshotChanges()
  }

  getIngredients(foodID){
    console.log("FoodID",foodID)
    return this.aft.collection('ingredients', ref=>ref.where(foodID,"==",foodID)).snapshotChanges()
  }

  storeImage(){

  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'Hamburguesa';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log("entre", file)
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }


  addPerson(person){
    this.aft.collection('persons').add(person);
  }


  // deletePersonByID(id){
  //   console.log("ID",id)
  //   let position=0;
  //   for(let i=0;i<this.db.length;i++){
  //     if(this.db[i].id==id){
  //       position = i;
  //     }
  //   }
  //   console.log("Position",position)
  //   let firtspart = this.db.slice(0,position-1);
  //   let secondpart = this.db.slice(position,this.db.length)
  //   console.log("First part",firtspart);
  //   console.log("Second part",secondpart)
  //   this.db = firtspart.concat(secondpart);
  // }

}
