import { Component } from '@angular/core';
interface BioLink {
  title: string;
  subtitle: string;
  url: string;
}
@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent {
  currentYear = new Date().getFullYear();
  links: BioLink[] = [
    {
      title: 'Converse com a JC Premium',
      subtitle: 'Atendimento pelo WhatsApp',
      url: 'https://wa.me/5565992985651?text=Ol%C3%A1%2C%20Jacqueline!%20Vim%20pelo%20site%20da%20JC%20Premium.',
    },
    {
      title: 'Jacqueline Fitl',
      subtitle: 'Acompanhe no Instagram',
      url: 'https://www.instagram.com/jacquelinefitl/',
    },
    {
      title: 'JC Premium Corretora',
      subtitle: 'Nosso universo no Instagram',
      url: 'https://www.instagram.com/jcpremiumcorretora/',
    },
    {
      title: 'Prefere ligar?',
      subtitle: '(65) 99298-5651',
      url: 'tel:+5565992985651',
    },
  ];
}
