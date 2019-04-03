import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-cadastro-bancos',
  templateUrl: './cadastro-bancos.component.html',
  styleUrls: ['./cadastro-bancos.component.css']
})

export class CadastroBancosComponent implements OnInit {
  private formCadastro;
  private page: number = 0;
  private listaItens: Array<any>;
  private pages: Array<number>;
  private pageSize: number = 4;
  constructor(private fb: FormBuilder, public rest: RestService) { }
  private mensagemCorpo: string;
  private exibeMensagem: boolean = false;
  private filtro: string = "";

  ngOnInit() {

    this.formCadastro = this.fb.group({
      descricaoBanco: [''],
      codigoBanco: [],
      descricaoSigla: []
    });
    this.getBancos();

  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getBancos();
  }
  getBancos() {
    let filtroEnviado = '';
    if (this.filtro && this.filtro != '' && this.filtro.length > 0) {
      filtroEnviado = '&descricaoBanco=' + '%' + this.filtro;
    }
    this.rest.getBancos(this.page, this.pageSize, filtroEnviado).subscribe(
      data => {
        this.listaItens = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      });
  }

  cadastro() {
    //TODO FAzer validação 
    if (!this.formCadastro.controls.codigoBanco.value || this.formCadastro.controls.codigoBanco.value == '') {
      this.mensagemCorpo = 'Informe o Codigo do Banco'
      this.exibeMensagem = true;
    } else if (!this.formCadastro.controls.descricaoBanco.value || this.formCadastro.controls.descricaoBanco.value == '') {
      this.mensagemCorpo = 'Informe o Nome do Banco'
      this.exibeMensagem = true;
    } else if (!this.formCadastro.controls.descricaoSigla.value || this.formCadastro.controls.descricaoSigla.value == '') {
      this.mensagemCorpo = 'Informe a Sigla do Banco'
      this.exibeMensagem = true;
    } else {
      this.rest.addBanco({
        codigoBanco: parseInt(this.formCadastro.controls.codigoBanco.value),
        descricaoBanco: this.formCadastro.controls.descricaoBanco.value,
        descricaoSigla: this.formCadastro.controls.descricaoSigla.value,
        codigoUsuario: "anomimo",
        dataLastrec: "2019-01-01"
      }).subscribe((data: {}) => {
        this.mensagemCorpo = 'Banco salvo com sucesso'
        this.exibeMensagem = true;
        this.sair();
      });
    }


  }
  sair() {
    if (document.getElementById('mat-tab-label-0-0')) {
      document.getElementById('mat-tab-label-0-0').click()
    }
    this.getBancos();
  }
  applyFilter(filterValue: string) {
    this.filtro = filterValue;
    this.getBancos()
  }

}

  //$('#mat-tab-label-1-0').click()
  //$('#mat-tab-label-1-1').click()


