import { Component, OnInit, Input} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import {DatabaseService} from "../../services/database.service"

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input('person') person;
  constructor(private route: ActivatedRoute, private database :DatabaseService) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    console.log("ID:",id)
    if(id){
    this.database.getPersonByID(id).subscribe(person=>{
      this.person = person;
    })
    console.log("person",this.person)
  }
  }
}

