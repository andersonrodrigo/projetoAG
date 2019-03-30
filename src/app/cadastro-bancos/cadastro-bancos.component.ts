import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface BancoElement {
  codigoBanco: number;
  descricaoBanco: string;
  descricaoSigla: string;
  
}

const ELEMENT_DATA: BancoElement[] = [];

@Component({
  selector: 'app-cadastro-bancos',
  templateUrl: './cadastro-bancos.component.html',
  styleUrls: ['./cadastro-bancos.component.css']
})

export class CadastroBancosComponent implements OnInit {
  formCadastro;
  tabs = ['Formulario', 'Seleção'];
  selected = new FormControl(0);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor(private fb: FormBuilder, public rest:RestService) { }
  displayedColumns: string[] = ['codigoBanco', 'descricaoBanco', 'descricaoSigla'];
  dataSource: MatTableDataSource<BancoElement>;
  mensagemCorpo;
  exibeMensagem = false;

  ngOnInit() {

    this.formCadastro = this.fb.group({
      descricaoBanco: [''],
      codigoBanco: [],
      descricaoSigla: []
    });
    this.getBancos();
  
  }

  
  
  getBancos() {
   // this.dataSource = new MatTableDataSource([]);
    this.rest.getBancos().subscribe((data: {}) => {
      var ELEMENT_DATA: BancoElement[] = [];
      for (var key in data) {
        ELEMENT_DATA.push(data[key]);
      }
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      
    });
  }

  cadastro(){
    this.rest.addBanco({codigoBanco: parseInt(this.formCadastro.controls.codigoBanco.value),
    descricaoBanco: this.formCadastro.controls.descricaoBanco.value,
    descricaoSigla: this.formCadastro.controls.descricaoSigla.value,
    codigoUsuario: "anomimo",
    dataLastrec: "2019-01-01"
      }).subscribe((data: {}) => {
      this.mensagemCorpo = 'Banco salvo com sucesso'
      this.exibeMensagem = true;
    });
    debugger
   }
   sair(){
     if (document.getElementById('mat-tab-label-0-0')){
       document.getElementById('mat-tab-label-0-0').click()
     }
     this.getBancos();
   }
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
  
  //$('#mat-tab-label-1-0').click()
  //$('#mat-tab-label-1-1').click()

 
