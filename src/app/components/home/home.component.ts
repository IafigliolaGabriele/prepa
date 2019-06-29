import { Component, OnInit , TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatabaseService} from '../../services/database.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

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
  personForm: FormGroup;
  currentUser: any;
  constructor
  (
    private modalService: BsModalService,
    private database: DatabaseService,
    private fb: FormBuilder
  )
  {
    this.filteredDb=[];
    this.personForm = this.fb.group({
      first_name: ["",Validators.required],
      last_name: ["",Validators.required],
      email: ["",[Validators.required,Validators.email]],
      gender: ["",Validators.required],
      address: ["",Validators.required, Validators.pattern('[0-9]*')]
    })
  }

  getErrorMessage(key) {
    return this.personForm.controls[key].hasError('required') ? 'You must enter a value' :
           this.personForm.controls[key].hasError('email') ? 'Not a valid email' :
           this.personForm.controls[key].hasError('pattern') ? 'ONLY NUMBERS' :
            '';
  }

/**
* Function to open an specific modal
* @param {TemplateRef<any>} template The ref of the modal to be open
* @author Gabriele Iafigliola
*/
   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

/**
* Function to open an specific modal with the info pre charged
* @param {TemplateRef<any>} template The ref of the modal to be open
* @author Gabriele Iafigliola
*/
  openModalWithInfo(template: TemplateRef<any>, person) {
    //this.personForm.controls['id'].setValue(person.id);
    console.log("Person",person);
    this.personForm = this.fb.group({
      first_name: [person.first_name,Validators.required],
      last_name: [person.last_name,Validators.required],
      email: [person.email,[Validators.required,Validators.email]],
      gender: [person.gender,Validators.required],
      address: [person.address,Validators.required],
      id: [person.id],
    })
    this.modalRef = this.modalService.show(template);
  }
  
/**
* Function to close an specific modal
* @param {TemplateRef<any>} template The ref of the modal to be open
* @author Gabriele Iafigliola
*/
closeModal() {
  this.personForm.reset();
  this.modalRef.hide();
}

/**
* Function delete a person from the database
* @author Gabriele Iafigliola
*/  
  deletePerson(person){
    console.log("Person",person)
    //this.database.deleteLastPerson();
    let response = this.database.deletePersonByID(person.id);
    response.then(response=>{
      console.log("Success")
    }).catch(err=>{
      console.log("Failure",err)
    })
  }

/**
* Function to update a person from the database
* @author Gabriele Iafigliola
*/  
updatePerson(){
  let id = this.personForm.value.id;
  delete this.personForm.value.id
  //this.database.deleteLastPerson();
  console.log("Person -->",this.personForm.value);
  let response = this.database.updatePersonByID(id,this.personForm.value);
  response.then(response=>{
    console.log("Success")
  }).catch(err=>{
    console.log("Failure",err)
  })
}

makeAdmin(person){
  person.admin = true;
  this.database.updateUserByID(person.id,person)
}

/**
* Function add a new person to the database
* @author Gabriele Iafigliola
*/
  addPerson(){
    this.database.addPerson(this.personForm.value);
  }

  ngOnInit() {
    this.db = this.database.getAllUsers();
    this.database.getUserByID("ziWdhhIXQPBTwdEoZaE6").subscribe(user=>{
      console.log("USERBYID",user)
        //  user['admin'] = true;
        //  this.database.updateUserByID("ziWdhhIXQPBTwdEoZaE6",user).then(data=>{
        //    console.log("Success",data)
        //  })
    })
    this.database.getCurrentUser().subscribe(user=>{
      console.log("USer",user)
      this.currentUser = user;
    })
    this.db.subscribe(data=>{
      console.log("data",data)
      this.filteredDb=[];
      data.forEach(element => {
        console.log("ID",element.payload.doc.id)
        console.log("USER",element.payload.doc.data())
        let person = element.payload.doc.data();
        person['id'] = element.payload.doc.id;
        this.filteredDb.push(person)
      });
    })
  }

}
