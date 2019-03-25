import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CadastroBancosComponent } from './cadastro-bancos/cadastro-bancos.component';
import { CadastroEmpenhoComponent } from './cadastro-empenho/cadastro-empenho.component';


const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'bancos', component: CadastroBancosComponent },
  { path: 'empenho', component: CadastroEmpenhoComponent },
  
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
