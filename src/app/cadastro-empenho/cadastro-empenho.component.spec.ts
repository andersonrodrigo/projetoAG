import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEmpenhoComponent } from './cadastro-empenho.component';

describe('CadastroEmpenhoComponent', () => {
  let component: CadastroEmpenhoComponent;
  let fixture: ComponentFixture<CadastroEmpenhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEmpenhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEmpenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
