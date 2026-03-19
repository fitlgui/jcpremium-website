import { Component, HostListener, signal, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface ServiceItem {
  title: string;
  description: string;
  subtitle: string;
}

interface Partner {
  name: string;
  logo: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms cubic-bezier(0.19, 1, 0.22, 1)', 
                style({ height: '*', opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(0.19, 1, 0.22, 1)', 
                style({ height: '0', opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit, AfterViewInit {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  currentYear = new Date().getFullYear();

  @ViewChildren('animItem') animItems!: QueryList<ElementRef>;

  services: ServiceItem[] = [
    {
      title: 'Seguros',
      subtitle: 'Proteção Completa e Estratégica',
      description: 'Vida, residencial, empresarial, saúde e responsabilidade civil. Soluções personalizadas que garantem segurança e tranquilidade para sua família e patrimônio.'
    },
    {
      title: 'Consórcios',
      subtitle: 'Alavancagem Inteligente',
      description: 'Cartas de crédito para automóveis e imóveis. Poder de compra à vista sem juros bancários, apenas planejamento estratégico e disciplina financeira.'
    },
    {
      title: 'Consultoria',
      subtitle: 'Visão 360° do seu Patrimônio',
      description: 'Análise profunda de riscos e oportunidades. Nossa expertise garante decisões assertivas e alinhadas aos seus objetivos de longo prazo.'
    }
  ];

  stats: Stat[] = [
    { value: '2017', label: 'Fundação' },
    { value: '+10k', label: 'Vidas Protegidas' },
    { value: '8', label: 'Anos de Mercado' },
    { value: '100%', label: 'Dedicação' }
  ];

  diferenciais = [
    { title: 'Atendimento Personalizado', desc: 'Consultoria especializada para cada cliente' },
    { title: 'Certificação SUSEP', desc: 'Habilitação profissional para atuar legalmente como corretora de seguros' },
    { title: 'Parcerias Premium', desc: 'Seguradoras e administradoras líderes' },
    { title: 'Visão de Longo Prazo', desc: 'Proteção que acompanha sua evolução' }
  ];

  partners: Partner[] = [
    { name: 'Porto Seguro', logo: '' },
    { name: 'MAG Seguros', logo: '' },
    { name: 'Tokio Marine', logo: '' },
    { name: 'Unimed Seguros', logo: '' },
    { name: 'HDI Seguros', logo: '' },
    { name: 'Bradesco Seguros', logo: '' },
    { name: 'Azul Seguros', logo: '' },
    { name: 'Azos', logo: '' },
  ];

  isHomeRoute: boolean = false; // Simulação de rota para exemplo

  ngOnInit() {
    this.isHomeRoute = window.location.pathname === '/';
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Adiciona a classe reveal-visible
          element.classList.add('reveal-visible');
          
          // Adiciona pulse sutil apenas na primeira vez
          if (!element.classList.contains('pulsed')) {
            element.classList.add('pulse-on-appear', 'pulsed');
            setTimeout(() => {
              element.classList.remove('pulse-on-appear');
            }, 3000);
          }
          
          // Para de observar após animar (performance)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px' // Ativa um pouco mais tarde para efeito mais dramático
    });

    this.animItems.forEach(item => {
      observer.observe(item.nativeElement);
    });
    
    // Parallax suave no scroll
    this.setupParallax();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }
  
  setupParallax() {
    let ticking = false;
    
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat((element as HTMLElement).dataset['speed'] || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  navClasses() {
    return this.isScrolled()
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200'
      : 'bg-transparent border-transparent';
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1800; // Duração mais elegante e sofisticada
      let start: number | null = null;

      // Função de easing ultra suave - ease-in-out customizado premium
      const easeInOutQuart = (t: number): number => {
        return t < 0.5 
          ? 8 * t * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easing = easeInOutQuart(progress);
        
        window.scrollTo(0, startPosition + distance * easing);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  toLinkedinCreator() {
    const url = 'https://www.linkedin.com/in/guilhermefitl/';
    window.open(url, '_blank');
  }

  toWhatsapp() {
    const phoneNumber = '5565992985651';
    const message = encodeURIComponent('Olá, gostaria de saber mais sobre a consultoria personalizada da JC Premium!');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }
}