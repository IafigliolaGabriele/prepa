import { Component, OnInit , TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatabaseService} from '../../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      address: ["",Validators.required]
    })
  }

  getErrorMessage(key) {
    return this.personForm.controls[key].hasError('required') ? 'You must enter a value' :
           this.personForm.controls[key].hasError('email') ? 'Not a valid email' :
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
  deletePerson(){
    this.database.deleteLastPerson();
  }

/**
* Function add a new person to the database
* @author Gabriele Iafigliola
*/
  addPerson(){
    this.database.addPerson(this.personForm.value);
  }

  ngOnInit() {
    this.db = this.database.getAllPersons();
    this.db.subscribe(data=>{
      console.log("data",data)
      this.filteredDb=[];
      data.forEach(element => {
        console.log("ID",element.payload.doc.id)
        this.filteredDb.push(element.payload.doc.data())
      });
    })
  }

}
