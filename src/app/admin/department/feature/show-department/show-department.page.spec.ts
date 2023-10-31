import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDepartmentPage } from './show-department.page';

describe('ShowDepartmentPage', () => {
  let component: ShowDepartmentPage;
  let fixture: ComponentFixture<ShowDepartmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowDepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
