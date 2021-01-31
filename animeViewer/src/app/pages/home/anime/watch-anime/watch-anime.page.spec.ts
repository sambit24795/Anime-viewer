import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchAnimePage } from './watch-anime.page';

describe('WatchAnimePage', () => {
  let component: WatchAnimePage;
  let fixture: ComponentFixture<WatchAnimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchAnimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchAnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
