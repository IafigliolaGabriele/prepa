import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  arrayTest = ['macari', 'beatriz', 'andrea']
  data = 'Hola gabo'
  name ='';


  despedir() {
    this.arrayTest.push(this.name);
    this.name = '';
  }
  



  constructor() { }

  ngOnInit() {
  }

}
