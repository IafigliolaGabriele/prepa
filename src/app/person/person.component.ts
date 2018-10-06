import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input('persona') person;
  constructor() { }

  ngOnInit() {
    console.log("PErsona",this.person)
  }

}
