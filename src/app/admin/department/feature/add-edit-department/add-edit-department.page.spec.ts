import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDepartmentPage } from './add-edit-department.page';

describe('AddEditDepartmentPage', () => {
  let component: AddEditDepartmentPage;
  let fixture: ComponentFixture<AddEditDepartmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditDepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
