import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';

 
 

@Component({
  selector: 'app-cadastro-empenho',
  templateUrl: './cadastro-empenho.component.html',
  styleUrls: ['./cadastro-empenho.component.css']
})

export class CadastroEmpenhoComponent implements OnInit {
  private page:number=0;
  private listaItens:Array<any>;
  private pages:Array<number>;
  private pageSize:number = 4;
  constructor(private fb: FormBuilder, public rest:RestService) { }
  private mensagemCorpo:string;
  private exibeMensagem:boolean = false;
  private filtro:string="";
  formCadastro;
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
    this.getEmpenhos();
  }
  setPage(i, event:any){
    event.preventDefault();
    this.page = i;
    this.getEmpenhos();
  }
  getEmpenhos() {
    let filtroEnviado = '';
    if (this.filtro && this.filtro != '' && this.filtro.length>0){
      filtroEnviado = '&serieEmpenho=' + '%'+this.filtro;
    }
     this.rest.getEmpenhos(this.page, this.pageSize, filtroEnviado).subscribe(
       data=>{
         this.listaItens = data['content'];
         this.pages = new Array(data['totalPages']);
       },
     (error) => { 
       console.log(error.error.message);
     });
   }

}
