import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProjectPage } from './show-project.page';

describe('ShowProjectPage', () => {
  let component: ShowProjectPage;
  let fixture: ComponentFixture<ShowProjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
