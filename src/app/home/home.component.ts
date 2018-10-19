import { Component, OnInit , TemplateRef} from '@angular/core';
import {NetworkService} from '../network.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatabaseService} from '../database.service';

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

  modalRef: BsModalRef;
  db: Array<Person>
  filteredDb: Array<Person>;
  texto: string = "Texto";

  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;

  constructor(
    private network: NetworkService,
    private modalService: BsModalService,
    private database: DatabaseService) {
    //network.entrenar();
    //network.entrenar2();
    //network.evaluate2(0);
   }

   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
    this.database.addPerson(newPerson);
    this.db = this.database.getAllPersons()
    this.filteredDb = this.database.getAllPersons()
    //this.network.evaluate2(0);
    //this.network.export();
  }

  eliminarPersona(){
    console.log("Texto",this.texto);
    this.database.deletePersonByID(this.texto)
    this.db = this.database.getAllPersons()
    this.filteredDb = this.database.getAllPersons()

  }


  filtrar(){
    this.filteredDb = this.db.filter(person=>{
      if(person.gender.includes(this.texto)){
        return person;
      }
    })
  }

  onSubmit(value){
    console.log("Form",value)
    value["id"] = this.db.length;
    this.database.addPerson(value)
    this.db = this.database.getAllPersons()
    this.filteredDb = this.database.getAllPersons()
  }

  ngOnInit() {
    this.db = this.database.getAllPersons()
    this.filteredDb = this.db;
    this.db.forEach((person: Person)=>{
      console.log("Person",person.first_name)
    })
  }

}
