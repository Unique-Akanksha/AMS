import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditProjectPage } from './add-edit-project.page';

describe('AddEditProjectPage', () => {
  let component: AddEditProjectPage;
  let fixture: ComponentFixture<AddEditProjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
