import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';

describe('JC Premium visitor journeys', () => {
  let fixture: ComponentFixture<AppComponent>;
  let events: Subject<NavigationEnd>;
  beforeEach(async () => {
    events = new Subject<NavigationEnd>();
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CommonModule, RouterTestingModule],
    }).compileComponents();
    spyOnProperty(TestBed.inject(Router), 'events', 'get').and.returnValue(
      events.asObservable(),
    );
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });
  it('includes both visitor choices in the encoded WhatsApp message and can restart', () => {
    const el: HTMLElement = fixture.nativeElement;
    (el.querySelectorAll('.quiz-option')[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    (el.querySelectorAll('.quiz-option')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    const cta = el.querySelector('.quiz-card .button') as HTMLAnchorElement;
    const url = new URL(cta.href);
    expect(url.hostname).toBe('wa.me');
    expect(url.searchParams.get('text')).toContain('Minha empresa');
    expect(url.searchParams.get('text')).toContain(
      'Já tenho seguro e quero revisar',
    );
    (el.querySelector('.quiz-card .back-link') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelectorAll('.quiz-option').length).toBe(4);
    expect(fixture.componentInstance.goal).toBe('');
  });
  it('updates the service panel and contact link for the selected service', () => {
    const el: HTMLElement = fixture.nativeElement;
    (el.querySelectorAll('[role=tab]')[3] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('[role=tabpanel]')?.textContent).toContain(
      'sem garantia de data',
    );
    expect(el.querySelectorAll('[aria-selected=true]').length).toBe(1);
    const url = new URL(
      (el.querySelector('.service-copy a') as HTMLAnchorElement).href,
    );
    expect(url.searchParams.get('text')).toContain('Consórcios');
  });
  it('opens mobile navigation and closes it after selecting a section', () => {
    const el: HTMLElement = fixture.nativeElement;
    (el.querySelector('.menu-toggle') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(
      el.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
    ).toBe('true');
    const sectionLink = el.querySelector('#main-nav a') as HTMLAnchorElement;
    sectionLink.addEventListener('click', (event) => event.preventDefault());
    sectionLink.click();
    fixture.detectChanges();
    expect(
      el.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
    ).toBe('false');
  });
  it('hides the home page on bio and restores it on return', () => {
    events.next(new NavigationEnd(1, '/bio', '/bio'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.website')).toBeNull();
    events.next(new NavigationEnd(2, '/', '/'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'história',
    );
  });
});
