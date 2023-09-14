import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDepPage } from './add-edit-dep.page';

describe('AddEditDepPage', () => {
  let component: AddEditDepPage;
  let fixture: ComponentFixture<AddEditDepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditDepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
