import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAnotacionDocenteComponent } from './listar-anotacion-docente.component';

describe('ListarAnotacionDocenteComponent', () => {
  let component: ListarAnotacionDocenteComponent;
  let fixture: ComponentFixture<ListarAnotacionDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAnotacionDocenteComponent]
    });
    fixture = TestBed.createComponent(ListarAnotacionDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
