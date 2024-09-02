import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBharatOrgPage } from './my-bharat-org.page';

describe('MyBharatOrgPage', () => {
  let component: MyBharatOrgPage;
  let fixture: ComponentFixture<MyBharatOrgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyBharatOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
