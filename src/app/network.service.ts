import { Injectable } from '@angular/core';
import {Layer,Network,Architecture,Trainer,Neuron} from 'synaptic'


class Item {
  input: Array<number>;
  output: Array<number>;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  inputLayer:Layer;
  hiddenLayer:Layer;
  outputLayer:Layer;
  network: Network;
  learningRate: number = 0.3;
  achitecture: Architecture;
  tranier: Trainer;

  constructor() { 
    this.inputLayer = new Layer(2);
    this.hiddenLayer = new Layer(3);
    this.outputLayer = new Layer(1)
    this.inputLayer.project(this.hiddenLayer);
    this.hiddenLayer.project(this.outputLayer);
    this.inputLayer.set({
      squash: Neuron.squash.TANH
    })
    this.hiddenLayer.set({
      squash: Neuron.squash.TANH
    })
    this.inputLayer.set({
      squash: Neuron.squash.TANH
    })

    this.network = new Network({
      input: this.inputLayer,
      hidden: [this.hiddenLayer],
      output: this.outputLayer
    })

  }

  trainingSet: Array<Item> = [
    {
      input: [0,0],
      output: [0]
    },
    {
      input: [1,0],
      output: [1]
    },
    {
      input: [0,1],
      output: [1]
    },
    {
      input: [1,1],
      output: [0]
    },
  ]
//ftp://puceftp.puce.edu.ec/Facultades/CienciasEducacion/Maestria/CienciasEducacion/Econom%C3%ADa%20de%20la%20Educaci%C3%B3n/Molera_Caballero.pdf
//https://scielo.conicyt.cl/scielo.php?script=sci_arttext&pid=S0718-33052016000400015
  entrenar(){
    console.log("Begin Training")
    for(let i=0;i<20000;i++){
      this.trainingSet.forEach(item=>{
        this.network.activate(item.input);
        this.network.propagate(this.learningRate,item.output);
      })
    }
    console.log("End Training")

    console.log("Informe de Entrenamiento");
    console.log("[0,0]")
    console.log(this.network.activate([0,0])); 
    //-> [0.015020775950893527]
    console.log("[0,1]")
    console.log(this.network.activate([0,1]));
    //->[0.9815816381088985]
    console.log("[1,0]")
    console.log(this.network.activate([1,0]));
    //-> [0.9871822457132193]
    console.log("[1,1]")
    console.log(this.network.activate([1,1]));
    //-> [0.012950087641929467]

  }

  create(config){

    this.inputLayer = new Layer(config.input);
    this.hiddenLayer = new Layer(config.hidden);
    this.outputLayer = new Layer(config.output)
    this.inputLayer.project(this.hiddenLayer);
    this.hiddenLayer.project(this.outputLayer);
    this.inputLayer.set({
      squash: Neuron.squash.TANH
    })
    this.hiddenLayer.set({
      squash: Neuron.squash.TANH
    })

    this.network = new Network({
      input: this.inputLayer,
      hidden: [this.hiddenLayer],
      output: this.outputLayer
    })
  }

 async entrenar2(){
    let trainer = new Trainer(this.network)
    console.log("Training ...");
    let training = await trainer.train(this.trainingSet,{
      rate: 0.5,
      iterations: 20000,
      error: .005,
      shuffle: true,
      log: 10,
      cost: Trainer.cost.MSE 
    });

    console.log("Training:",training)
    return training;
  }

  async entrenar3(config){
    let trainer = new Trainer(this.network)
    console.log(config,"Training ...");
    let training = await trainer.train(this.trainingSet,{
      rate: config.learning_rate,
      iterations: config.iterations,
      error: config.error,
      shuffle: true,
      log: 10,
      cost: Trainer.cost.MSE 
    });

    console.log("Training:",training)
    return training;
  }

  evaluate(inputs){
    return this.network.activate(inputs);
  }

}
