import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComidasPage } from './comidas.page';

describe('ComidasPage', () => {
  let component: ComidasPage;
  let fixture: ComponentFixture<ComidasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
