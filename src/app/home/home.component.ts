import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../network.service';
class Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
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

  filteredDb: Array<Person>;

  texto: string = "Texto";

  constructor(network: NetworkService) {
    //network.entrenar();
    network.entrenar2();
   }

  agregarPersona(){

    let newPerson = {
      "id":6,
      "first_name":this.texto,
      "last_name":"Caramba",
      "email":"aycaramba@netvibes.com",
      "gender":"Male",
      "address":"1ET1kVe7YrVJgKGXpBULgHZjsG7LiJ7wh4"
    }
    this.texto = newPerson.email;
    this.db.push(newPerson);
  }

  eliminarPersona(){
    this.db.pop();
  }

  ngOnInit() {
    this.db.forEach((person: Person)=>{
      console.log("Person",person.first_name)
    })

    this.filteredDb = this.db.filter(person=>{
      if(person.gender=="Male"){
        return person;
      }
    })
  }

}
