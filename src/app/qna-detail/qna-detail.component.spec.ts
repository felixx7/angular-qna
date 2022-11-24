import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaDetailComponent } from './qna-detail.component';

describe('QnaDetailComponent', () => {
  let component: QnaDetailComponent;
  let fixture: ComponentFixture<QnaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QnaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
