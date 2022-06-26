import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDialogComponent } from './md-dialog.component';

describe('MdInfoComponent', () => {
  let component: MdDialogComponent;
  let fixture: ComponentFixture<MdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
