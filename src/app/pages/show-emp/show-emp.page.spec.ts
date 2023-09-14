import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowEmpPage } from './show-emp.page';

describe('ShowEmpPage', () => {
  let component: ShowEmpPage;
  let fixture: ComponentFixture<ShowEmpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
