import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


export interface PeriodicElement {
  codigoBanco: number;
  descricaoBanco: string;
  descricaoSigla: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-cadastro-bancos',
  templateUrl: './cadastro-bancos.component.html',
  styleUrls: ['./cadastro-bancos.component.css']
})

export class CadastroBancosComponent implements OnInit {
  formCadastro;
  tabs = ['Formulario', 'Seleção'];
  selected = new FormControl(0);
  constructor(private fb: FormBuilder, public rest:RestService) { }
  displayedColumns: string[] = ['codigoBanco', 'descricaoBanco', 'descricaoSigla'];
  dataSource = ELEMENT_DATA;
  mensagemCorpo;
  mensagemTitulo;
  exibeMensagem = false;
  _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this.formCadastro = this.fb.group({
      descricaoBanco: [''],
      codigoBanco: [],
      descricaoSigla: []
    });
    this.getBancos();
  }

  public changeSuccessMessage() {
    this._success.next(`${new Date()} - Message successfully changed.`);
  }
  
  getBancos() {
    this.dataSource = [];
    this.rest.getBancos().subscribe((data: {}) => {
      console.log(data);
      var ELEMENT_DATA: PeriodicElement[] = [];
      for (var key in data) {
        ELEMENT_DATA.push(data[key]);
      }
      this.dataSource = ELEMENT_DATA;
    });
  }

  cadastro(){
    console.log(this.formCadastro.controls);
    debugger
    this.rest.addBanco({codigoBanco: parseInt(this.formCadastro.controls.codigoBanco.value),
    descricaoBanco: this.formCadastro.controls.descricaoBanco.value,
    descricaoSigla: this.formCadastro.controls.descricaoSigla.value,
    codigoUsuario: "anomimo",
    dataLastrec: "2019-01-01"
      }).subscribe((data: {}) => {
      console.log(data);
      this.mensagemTitulo = 'Sucesso';
      this.mensagemCorpo = 'Banco salvo com sucesso'
    });
    debugger
   }
   sair(){
     if (document.getElementById('mat-tab-label-0-0')){
       document.getElementById('mat-tab-label-0-0').click()
     }
   //jQuery('.mat-tab-label mat-ripple ng-star-inserted').click()
   
   }
  
}
  
  //$('#mat-tab-label-1-0').click()
  //$('#mat-tab-label-1-1').click()

 
