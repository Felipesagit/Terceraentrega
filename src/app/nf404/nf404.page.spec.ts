import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nf404Page } from './nf404.page';

describe('Nf404Page', () => {
  let component: Nf404Page;
  let fixture: ComponentFixture<Nf404Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Nf404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
