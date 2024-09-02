import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrgPage } from './create-org.page';

describe('CreateOrgPage', () => {
  let component: CreateOrgPage;
  let fixture: ComponentFixture<CreateOrgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
