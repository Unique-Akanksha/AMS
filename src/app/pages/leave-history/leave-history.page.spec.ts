import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveHistoryPage } from './leave-history.page';

describe('LeaveHistoryPage', () => {
  let component: LeaveHistoryPage;
  let fixture: ComponentFixture<LeaveHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeaveHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
