import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  currentYear = new Date().getFullYear();
  isHomeRoute = true;
  mobileMenuOpen = false;
  selectedService = 0;
  quizStep = 0;
  goal = '';
  moment = '';
  goals = [
    'Minha família e minha renda',
    'Meu patrimônio',
    'Minha empresa',
    'Meus próximos planos',
  ];
  moments = [
    'Quero começar a me proteger',
    'Já tenho seguro e quero revisar',
    'Quero conhecer as possibilidades',
  ];
  partners = [
    'Porto Seguro',
    'MAG Seguros',
    'Tokio Marine',
    'Unimed Seguros',
    'HDI Seguros',
    'Bradesco Seguros',
    'Azul Seguros',
    'Azos',
  ];
  offices = [
    {
      city: 'Cuiabá',
      state: 'MT',
      address:
        'Rua Arnaldo Lopes Sussekind, 51, Campos Office 2 — Jardim Aclimação, Cuiabá – MT, 78050-258',
      phone: '',
      phoneUrl: '',
    },
    {
      city: 'João Pessoa',
      state: 'PB',
      address:
        'Rua Antônio Rabelo Júnior, 161 e 170, sala 405, 4º andar — Miramar, João Pessoa – PB, 58032-090',
      phone: '(83) 3241-8741',
      phoneUrl: 'tel:+558332418741',
    },
    {
      city: 'São Paulo',
      state: 'SP',
      address:
        'Alameda Barão de Piracicaba, 618 — Campos Elíseos, São Paulo – SP, 01216-012',
      phone: '',
      phoneUrl: '',
    },
  ];
  officeMapUrl(address: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
  services = [
    {
      name: 'Vida & família',
      number: '01',
      title: 'Seu cuidado continua. Em cada fase da vida.',
      description:
        'Uma conversa sobre as pessoas que você ama, sua renda e o futuro que deseja construir.',
      tags: ['Seguro de vida', 'Saúde', 'Proteção da renda'],
      detail:
        'Vamos entender sua rotina e avaliar coberturas que façam sentido para você, conforme as condições de cada produto.',
    },
    {
      name: 'Patrimônio',
      number: '02',
      title: 'Tudo o que você construiu merece cuidado.',
      description:
        'Da sua casa ao seu automóvel, encontre caminhos para cuidar do patrimônio que faz parte da sua história.',
      tags: ['Residencial', 'Automóvel', 'Responsabilidade civil'],
      detail:
        'A consultoria ajuda a comparar coberturas, franquias e assistências, com atenção ao seu uso e às condições da seguradora.',
    },
    {
      name: 'Sua empresa',
      number: '03',
      title: 'Mais segurança para seguir empreendendo.',
      description:
        'Proteção para o negócio, para as pessoas e para os riscos que acompanham quem empreende.',
      tags: ['Empresarial', 'Vida em grupo', 'Responsabilidade civil'],
      detail:
        'Conte sobre sua atividade para conversarmos sobre possibilidades de proteção para sua equipe e sua operação.',
    },
    {
      name: 'Consórcios',
      number: '04',
      title: 'Seus próximos capítulos começam com um plano.',
      description:
        'Planejamento para conquistar um imóvel ou automóvel, com orientação para entender o funcionamento do consórcio.',
      tags: ['Imóveis', 'Automóveis', 'Planejamento'],
      detail:
        'Consórcios têm taxa de administração e podem ter outros encargos. A contemplação segue as regras do grupo, por sorteio ou lance, sem garantia de data.',
    },
  ];
  faqs = [
    {
      question: 'Por onde começo para escolher meu seguro?',
      answer:
        'Comece pelo que você quer proteger. No roteiro acima, escolha sua prioridade e leve suas respostas para uma conversa com a JC Premium. A equipe vai entender seu momento antes de apresentar opções.',
    },
    {
      question: 'Já tenho seguro. Posso pedir uma revisão?',
      answer:
        'Sim. Você pode conversar com a equipe sobre sua apólice atual e mudanças na sua rotina, para avaliar se as coberturas continuam alinhadas às suas necessidades.',
    },
    {
      question: 'O atendimento pode ser feito a distância?',
      answer:
        'Você pode iniciar o atendimento pelo WhatsApp de onde estiver e combinar com a equipe a melhor forma de continuar a conversa.',
    },
    {
      question: 'O roteiro apresenta uma cotação?',
      answer:
        'O roteiro organiza seus interesses para o atendimento. Valores, coberturas, aceitação e condições dependem da análise e da proposta de cada seguradora ou administradora.',
    },
  ];
  private routeSubscription: Subscription;
  constructor(router: Router) {
    this.routeSubscription = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = event.urlAfterRedirects.split(/[?#]/)[0] !== '/bio';
        this.mobileMenuOpen = false;
      }
    });
  }
  get whatsappUrl(): string {
    const message =
      this.quizStep === 2
        ? `Olá, Jacqueline! Vim pelo site da JC Premium. Quero conversar sobre: ${this.goal}. Meu momento: ${this.moment}. Podemos conversar?`
        : 'Olá, Jacqueline! Vim pelo site da JC Premium e gostaria de um atendimento personalizado.';
    return `https://wa.me/5565992985651?text=${encodeURIComponent(message)}`;
  }
  serviceUrl(): string {
    return `https://wa.me/5565992985651?text=${encodeURIComponent('Olá, Jacqueline! Gostaria de conversar sobre ' + this.services[this.selectedService].name + '.')}`;
  }
  chooseGoal(goal: string): void {
    this.goal = goal;
    this.quizStep = 1;
  }
  chooseMoment(moment: string): void {
    this.moment = moment;
    this.quizStep = 2;
  }
  resetQuiz(): void {
    this.quizStep = 0;
    this.goal = '';
    this.moment = '';
  }
  closeMenu(): void {
    this.mobileMenuOpen = false;
  }
  onServiceKeydown(event: KeyboardEvent, index: number): void {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % this.services.length;
    else if (event.key === 'ArrowLeft')
      next = (index + this.services.length - 1) % this.services.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = this.services.length - 1;
    else return;
    event.preventDefault();
    this.selectedService = next;
    document.getElementById('tab-' + next)?.focus();
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
