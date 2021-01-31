import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HentaiPage } from './hentai.page';

describe('HentaiPage', () => {
  let component: HentaiPage;
  let fixture: ComponentFixture<HentaiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HentaiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HentaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
