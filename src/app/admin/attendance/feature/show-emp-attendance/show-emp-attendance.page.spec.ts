import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowEmpAttendancePage } from './show-emp-attendance.page';

describe('ShowEmpAttendancePage', () => {
  let component: ShowEmpAttendancePage;
  let fixture: ComponentFixture<ShowEmpAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowEmpAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
