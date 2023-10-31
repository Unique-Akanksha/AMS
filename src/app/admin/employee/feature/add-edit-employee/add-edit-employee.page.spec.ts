import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditEmployeePage } from './add-edit-employee.page';

describe('AddEditEmployeePage', () => {
  let component: AddEditEmployeePage;
  let fixture: ComponentFixture<AddEditEmployeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
