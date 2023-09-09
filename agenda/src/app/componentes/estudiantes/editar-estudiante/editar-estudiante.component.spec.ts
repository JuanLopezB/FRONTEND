import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudianteComponent } from './editar-estudiante.component';

describe('EditarEstudianteComponent', () => {
  let component: EditarEstudianteComponent;
  let fixture: ComponentFixture<EditarEstudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEstudianteComponent]
    });
    fixture = TestBed.createComponent(EditarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
