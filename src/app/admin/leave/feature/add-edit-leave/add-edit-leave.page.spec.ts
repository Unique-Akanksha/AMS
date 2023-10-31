import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditLeavePage } from './add-edit-leave.page';

describe('AddEditLeavePage', () => {
  let component: AddEditLeavePage;
  let fixture: ComponentFixture<AddEditLeavePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
