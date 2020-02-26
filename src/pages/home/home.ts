import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
//  this.navCtrl.push('CategoriasPage'); //com push empilha ne ai ja dixa com a setinha de voltar auto
    this.navCtrl.setRoot('CategoriasPage');//com setRoot so manda pra outra pagina sem chance de voltar pra tras auto kkk
  }
}
