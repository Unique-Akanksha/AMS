import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLeaveHistoryPage } from './admin-leave-history.page';

describe('AdminLeaveHistoryPage', () => {
  let component: AdminLeaveHistoryPage;
  let fixture: ComponentFixture<AdminLeaveHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminLeaveHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
