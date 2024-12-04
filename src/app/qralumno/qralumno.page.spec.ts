import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QralumnoPage } from './qralumno.page';

describe('QralumnoPage', () => {
  let component: QralumnoPage;
  let fixture: ComponentFixture<QralumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QralumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
