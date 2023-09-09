import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAcudienteComponent } from './editar-acudiente.component';

describe('EditarAcudienteComponent', () => {
  let component: EditarAcudienteComponent;
  let fixture: ComponentFixture<EditarAcudienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAcudienteComponent]
    });
    fixture = TestBed.createComponent(EditarAcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
