import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApproveRequestsPage } from './approve-requests.page';

describe('ApproveRequestsPage', () => {
  let component: ApproveRequestsPage;
  let fixture: ComponentFixture<ApproveRequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApproveRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
