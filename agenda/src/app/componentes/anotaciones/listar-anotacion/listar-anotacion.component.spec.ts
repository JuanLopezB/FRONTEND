import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAnotacionComponent } from './listar-anotacion.component';

describe('ListarAnotacionComponent', () => {
  let component: ListarAnotacionComponent;
  let fixture: ComponentFixture<ListarAnotacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAnotacionComponent]
    });
    fixture = TestBed.createComponent(ListarAnotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
