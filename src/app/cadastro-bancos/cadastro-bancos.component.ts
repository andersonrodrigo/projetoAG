import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';


export interface PeriodicElement {
  codigoBanco: number;
  descricaoBanco: string;
  descricaoSigla: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigoBanco: 1, descricaoBanco: 'Banco do Brasil', descricaoSigla: 'BB'},
  {codigoBanco: 2, descricaoBanco: 'Caixa Economica', descricaoSigla: 'CX'},
  {codigoBanco: 3, descricaoBanco: 'Bradesco', descricaoSigla: 'BRA'},
  {codigoBanco: 4, descricaoBanco: 'Itau', descricaoSigla: 'IT'}

];



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
  acao;
  ngOnInit() {
    this.formCadastro = this.fb.group({
      descricaoBanco: [''],
      codigoBanco: [],
      descricaoSigla: []
    });
    this.getBancos();
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
       dataLastrec: null,
       codigoUsuario: 1
      }).subscribe((data: {}) => {
      console.log(data);
    });
    debugger
   }
   sair(){
    document.getElementById('mat-tab-label-0-0').click()
   }
  
}
  
  //$('#mat-tab-label-1-0').click()
  //$('#mat-tab-label-1-1').click()

 
