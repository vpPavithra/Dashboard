import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinOrgPage } from './join-org.page';

describe('JoinOrgPage', () => {
  let component: JoinOrgPage;
  let fixture: ComponentFixture<JoinOrgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JoinOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
