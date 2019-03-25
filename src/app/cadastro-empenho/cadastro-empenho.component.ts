import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';

export interface PeriodicElement {
  codigoBanco: number;
  descricaoBanco: string;
 
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigoBanco: 1, descricaoBanco: 'Empenho 1' },
  {codigoBanco: 2, descricaoBanco: 'Empenho 1' },
  {codigoBanco: 3, descricaoBanco: 'Empenho 1' },
  {codigoBanco: 4, descricaoBanco: 'Empenho 1' }

];

@Component({
  selector: 'app-cadastro-empenho',
  templateUrl: './cadastro-empenho.component.html',
  styleUrls: ['./cadastro-empenho.component.css']
})

export class CadastroEmpenhoComponent implements OnInit {

  constructor(private fb: FormBuilder, public rest:RestService) { }
  formCadastro;
  displayedColumns: string[] = ['codigoBanco', 'descricaoBanco' ];
  dataSource = ELEMENT_DATA;
  ngOnInit() {
    this.formCadastro = this.fb.group({
        codigoEntidade: [],
        serieEmpenho: [],
        idtTipoempenho: [''],
        funcionalProgramatica:  [''],
        valorEmpenho: [],
        dataEmpenho:  [''],
        unidadeOrcamentaria:  [''],
        descricaoUnidadeOrcamentaria:  [''],
        naturezaDespesa:  [''],
        descricaoNaturezaDespesa:  [''],
        naturezaDespesaExecucacao:  [''],
        descricaoNaturezaDespesaExecucao:  [''],
        fonteRecurso:  [''],
        descricacaoRecurso:  [''],
        fonteRecursoExecucao:  [''],
        descricacaoRecursoExecucao:  [''],
        fichaOrcamento: [],
        codigoVPD:  [''],
        descricaoVPD: [''],
        codigoGrupoEntidadeCompras: [],
        codigoModalidadeLicitacao: [],
        descricaoModalidadeLicitacao:  [''],
        flagPessoal:  [''],
        idtTipodespesa:  [''],
        flagDespesaimpugnada:  [''],
        codigoCredor: [],
        nomeCredor:  [''],
        historicoEmpenho:  [''],
        numeroEmpenho: []
    });
  }

}
