import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditEmpPage } from './add-edit-emp.page';

describe('AddEditEmpPage', () => {
  let component: AddEditEmpPage;
  let fixture: ComponentFixture<AddEditEmpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
