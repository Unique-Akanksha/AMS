import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDepPage } from './show-dep.page';

describe('ShowDepPage', () => {
  let component: ShowDepPage;
  let fixture: ComponentFixture<ShowDepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowDepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
