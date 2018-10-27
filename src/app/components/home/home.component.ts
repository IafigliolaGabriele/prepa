import { Component, OnInit , TemplateRef} from '@angular/core';
import {NetworkService} from '../network.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatabaseService} from '../database.service';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  db: Observable<any[]>
  filteredDb: Array<Person>;
  texto: string = "Texto";

  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  public books: Observable<any[]>;
  public tutor: Observable<any[]>;
  public tutorRef:  AngularFireList<any[]>
  public bookRef:any;
  constructor(
    private datab: AngularFireDatabase,
    private network: NetworkService,
    private modalService: BsModalService,
    private database: DatabaseService,
    private authService: AuthService) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.filteredDb=[]
      // console.log("User",this.authService.getUser());
      // console.log("User Key",this.authService.userKey)
      // console.log("USER", user);
      // this.bookRef = datab.list('users')
      // this.books = this.bookRef.valueChanges();
      // //this.tutorRef = this.datab.list('/users', ref => 
      // //  ref.orderByKey().equalTo(user.user.uid)
      // //);
      // this.tutorRef = this.datab.list('/users/'+user.user.uid+'/students')
      // this.tutor = this.tutorRef.valueChanges()
      
      // this.tutorRef.valueChanges().subscribe(data=>{
      //   console.log("Suscribed:",data)
      // });

    //network.entrenar();
    //network.entrenar2();
    //network.evaluate2(0);
   }

   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async agregarPersona(){
    //asignar tutor
    //this.tutorRef.push(["14164021"])

    let newPerson = {
      "id":6,
      "first_name":this.texto,
      "last_name":"Caramba",
      "email":"aycaramba@netvibes.com",
      "gender":"Male",
      "address":"1ET1kVe7YrVJgKGXpBULgHZjsG7LiJ7wh4"
    }
    this.texto = newPerson.email;
   // this.db.push(newPerson);
    this.database.addPerson(newPerson);
    this.db = await this.database.getAllPersons()
   // this.filteredDb = await this.database.getAllPersons()
    this.network.evaluate2(0);
    this.network.export();
  }

  eliminarPersona(){
    console.log("Texto",this.texto);
    this.database.deletePersonByID(this.texto)
    this.db = this.database.getAllPersons()
  //  this.filteredDb = this.database.getAllPersons()

  }


  filtrar(){
    // this.filteredDb = this.db.filter(person=>{
    //   if(person.gender.includes(this.texto)){
    //     return person;
    //   }
    // })
  }

  onSubmit(value){
    console.log("Form",value)
   // value["id"] = this.db.length;
    this.database.addPerson(value)
    //this.db = this.database.getAllPersons()
  //  this.filteredDb = this.database.getAllPersons()
   // console.log("TUTOR",this.tutor)
  }

  ngOnInit() {
    this.db = this.database.getPersonByGender("Female");
    this.db.subscribe(data=>{
      this.filteredDb=[];
      this.filteredDb = data;
    })
    let newArray=[];
    console.log("Entre")
    // this.db.subscribe(data=>{
    //   this.filteredDb=[];
    //   data.map(data2=>{
    //     console.log("Data2",data2.payload.doc.id)
    //     console.log("Contenido",)
    //     let person = data2.payload.doc.data() as Person;
    //     this.filteredDb.push(person)
    //   })
    // })
    // this.db.pipe(
    //   map(items=>{
    //     console.log("Item",items)
    //     return items.map(a=>{
    //       console.log("Data:",a.payload.val());
    //       console.log("Key",a.payload.key)
    //       this.filteredDb.push(a.payload.val());
    //     })
    //   })
    // )
    //this.filteredDb = this.db;
    // this.db.forEach((person: Person)=>{
    //   console.log("Person",person.first_name)
    // })
  }

}
