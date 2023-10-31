import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAttendancePage } from './show-attendance.page';

describe('ShowAttendancePage', () => {
  let component: ShowAttendancePage;
  let fixture: ComponentFixture<ShowAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
