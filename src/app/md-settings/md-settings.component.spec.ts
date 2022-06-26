import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdSettingsComponent } from './md-settings.component';

describe('MdSettingsComponent', () => {
  let component: MdSettingsComponent;
  let fixture: ComponentFixture<MdSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
