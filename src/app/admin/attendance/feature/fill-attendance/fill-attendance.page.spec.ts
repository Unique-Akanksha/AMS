import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillAttendancePage } from './fill-attendance.page';

describe('FillAttendancePage', () => {
  let component: FillAttendancePage;
  let fixture: ComponentFixture<FillAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FillAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
