import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEmpPage } from './profile-emp.page';

describe('ProfileEmpPage', () => {
  let component: ProfileEmpPage;
  let fixture: ComponentFixture<ProfileEmpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
