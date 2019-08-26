import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsStoreModule } from '@appstore/store.module';
import { MessengerContainerComponent } from './messenger-container.component';


describe('MessengerContainerComponent', () => {
  let component: MessengerContainerComponent;
  let fixture: ComponentFixture<MessengerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerContainerComponent],
      imports: [NgxsStoreModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
