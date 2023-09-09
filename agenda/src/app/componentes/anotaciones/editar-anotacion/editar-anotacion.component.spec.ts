import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnotacionComponent } from './editar-anotacion.component';

describe('EditarAnotacionComponent', () => {
  let component: EditarAnotacionComponent;
  let fixture: ComponentFixture<EditarAnotacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAnotacionComponent]
    });
    fixture = TestBed.createComponent(EditarAnotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
