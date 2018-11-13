import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../../services/network.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

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
  hidden: any;
  output: any;
  input: any;
  

  train(config){
    let trainingReport = this.network.entrenar2();
    console.log("TrainingReport",trainingReport);
  }

  validate(config){
    this.network.evaluate2(0);
    this.network.export();
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
