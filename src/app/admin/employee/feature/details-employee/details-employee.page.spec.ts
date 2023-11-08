import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsEmployeePage } from './details-employee.page';

describe('DetailsEmployeePage', () => {
  let component: DetailsEmployeePage;
  let fixture: ComponentFixture<DetailsEmployeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
