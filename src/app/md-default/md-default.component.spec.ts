import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDefaultComponent } from './md-default.component';

describe('MdDefaultComponent', () => {
  let component: MdDefaultComponent;
  let fixture: ComponentFixture<MdDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
