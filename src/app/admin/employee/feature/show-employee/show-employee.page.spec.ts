import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowEmployeePage } from './show-employee.page';

describe('ShowEmployeePage', () => {
  let component: ShowEmployeePage;
  let fixture: ComponentFixture<ShowEmployeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
