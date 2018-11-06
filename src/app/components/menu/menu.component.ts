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


class Food {
  key?: string;
  name: string;
  description: string;
  image_url: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  modalRef: BsModalRef;
  db: Observable<any[]>
  filteredDb: Array<Food>;
  texto: string = "Texto";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  foodForm: FormGroup;
  urlReady = false;
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
        image_url: ["",[Validators.required]]
      })
   }

   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async agregarComida(){

  }

  eliminarPersona(){
    console.log("Texto",this.texto);
    this.database.deletePersonByID(this.texto)
    this.db = this.database.getAllPersons()
  //  this.filteredDb = this.database.getAllPersons()

  }

  onSubmit(value){
    console.log("Form",value)
    this.foodForm.value.image_url = this.downloadURL;
    this.database.addFood(this.foodForm.value)
  }

  addFood(){
    this.foodForm.value.image_url = this.downloadURL;
    console.log("Form",this.foodForm.value)
    this.database.addFood(this.foodForm.value)
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

  ngOnInit() {
    console.log("[Entre]");
    this.db = this.database.getAllFoods();
    this.db.subscribe(data=>{
      console.log("data",data)
      this.filteredDb=[];
      data.forEach(element => {
        console.log("ID",element.payload.doc.id)
        this.filteredDb.push(element.payload.doc.data())
      });
    })
    let newArray=[];
    console.log("Entre")
  }

}
