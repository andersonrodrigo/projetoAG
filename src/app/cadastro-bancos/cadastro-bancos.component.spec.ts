import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBancosComponent } from './cadastro-bancos.component';

describe('CadastroBancosComponent', () => {
  let component: CadastroBancosComponent;
  let fixture: ComponentFixture<CadastroBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
