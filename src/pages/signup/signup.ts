import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { ClienteService } from '../../services/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteSerive: ClienteService,
    public alertCtrl: AlertController) {


      this.formGroup = formBuilder.group({
        nome: ['Mariana', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['mari123@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['14541967774', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['12345', [Validators.required]],
        logradouro: ['rua das flores', [Validators.required]],
        numero: ['231', [Validators.required]],
        complemento: ['',[]],
        bairro: ['',[]],
        cep: ['11050050',[Validators.required]],
        telefone1: ['992458899',[Validators.required]],
        telefone2: ['',[]],
        telefone3: ['',[]],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  signupUser(){
    this.clienteSerive.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error =>{});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
