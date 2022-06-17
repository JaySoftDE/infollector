import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdErrorComponent } from './md-error.component';

describe('MdErrorComponent', () => {
  let component: MdErrorComponent;
  let fixture: ComponentFixture<MdErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
