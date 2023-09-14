import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditAttendancePage } from './add-edit-attendance.page';

describe('AddEditAttendancePage', () => {
  let component: AddEditAttendancePage;
  let fixture: ComponentFixture<AddEditAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
