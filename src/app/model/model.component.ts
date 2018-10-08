import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../network.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  learning_rate: number;
  iterations: number;
  error: number;
  result: number;
  inputs: Array<any>;
  modelCreated: boolean = false;
  currentInputs: Array<String> = ["apoyo","trabajo"]
  evaluation: number;

  train(config){
    this.network.entrenar3(config).then(result=>{
      this.result = result;
    })
  }

  use(config){
    let inputArray: Array<Number> =[];
    this.currentInputs.forEach(element => {
      if(config.inputs.includes(element)){
        console.log("Contiene",element)
        inputArray.push(1);
      }else{
        inputArray.push(0);
      }
    });
    console.log("Config",config);
   this.evaluation = this.network.evaluate(inputArray);
  }

  create(config){
    this.network.create(config)
    this.modelCreated = true;

  }

  constructor(public network: NetworkService) { }

  ngOnInit() {
  }

}
