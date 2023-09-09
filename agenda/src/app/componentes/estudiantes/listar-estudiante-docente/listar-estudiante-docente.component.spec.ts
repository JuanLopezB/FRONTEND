import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstudianteDocenteComponent } from './listar-estudiante-docente.component';

describe('ListarEstudianteDocenteComponent', () => {
  let component: ListarEstudianteDocenteComponent;
  let fixture: ComponentFixture<ListarEstudianteDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEstudianteDocenteComponent]
    });
    fixture = TestBed.createComponent(ListarEstudianteDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
