import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAcudienteComponent } from './listar-acudiente.component';

describe('ListarAcudienteComponent', () => {
  let component: ListarAcudienteComponent;
  let fixture: ComponentFixture<ListarAcudienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAcudienteComponent]
    });
    fixture = TestBed.createComponent(ListarAcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
