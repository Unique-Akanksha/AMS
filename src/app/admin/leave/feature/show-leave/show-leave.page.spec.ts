import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowLeavePage } from './show-leave.page';

describe('ShowLeavePage', () => {
  let component: ShowLeavePage;
  let fixture: ComponentFixture<ShowLeavePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
