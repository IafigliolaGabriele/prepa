import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore'
import { Observable } from 'rxjs';


class Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: Array<Person> = 
  [
    {
      "id":1,
      "first_name":"Mariel",
      "last_name":"Trees",
      "email":"mtrees0@redcross.org",
      "gender":"Female",
      "address":"13TNr7GNKdNjv6zv42K25tcD2WViPmeB9N"
    },
    {
      "id":2,
      "first_name":"Eran",
      "last_name":"Delve",
      "email":"edelve1@prweb.com",
      "gender":"Female",
      "address":"1PNr1N1p9GzzZAacwSXL9YRrMZJ42HCMv9"
    },
    {
      "id":3,
      "first_name":"Debbie",
      "last_name":"Affuso",
      "email":"daffuso2@pagesperso-orange.fr",
      "gender":"Female",
      "address":"1DLeeWrkSPHhC5itgAbgTdLbsQQhQhsKyC"
    },
    {
      "id":4,
      "first_name":"Janelle",
      "last_name":"Enriques",
      "email":"jenriques3@moonfruit.com",
      "gender":"Female",
      "address":"1PFxbFih62gv2dH2MhjAxCfKdzWTk1rpDD"
    },
    {
      "id":5,
      "first_name":"Addy",
      "last_name":"Sharp",
      "email":"asharp4@netvibes.com",
      "gender":"Male",
      "address":"1ET1kVe7YrVJgKXXpBULgHZjsG7LiJ7wh4"
    }
  ]
  personRef: AngularFirestoreCollection<Person>
  constructor(private aft: AngularFirestore) { 
    this.personRef = this.aft.collection('persons')
    let person = {
      id: 24532123,
      first_name:"Mariel",
      last_name:"Trees",
      email:"mtrees0@redcross.org",
      gender:"Female",
      address:"13TNr7GNKdNjv6zv42K25tcD2WViPmeB9N"
    }
    //this.personRef.add(person)
  }

  getAllPersons(){
     return this.personRef.snapshotChanges();
  }

  getPersonByID(id){
    return this.aft.collection('persons',ref=>ref.where('gender','==','Male')).valueChanges()
  }

    getPersonByGender(gender){
      return this.aft.collection('persons',ref=>ref.where('gender','==',gender)).valueChanges()
 
  }

  addPerson(person){
    this.aft.collection('persons').add(person);
  }

  deleteLastPerson(){
    this.db.pop()
  }

  deletePersonByID(id){
    console.log("ID",id)
    let position=0;
    for(let i=0;i<this.db.length;i++){
      if(this.db[i].id==id){
        position = i;
      }
    }
    console.log("Position",position)
    let firtspart = this.db.slice(0,position-1);
    let secondpart = this.db.slice(position,this.db.length)
    console.log("First part",firtspart);
    console.log("Second part",secondpart)
    this.db = firtspart.concat(secondpart);
  }

}
