import { Component, HostListener, signal, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Main Container com a cor Platina da marca como base suave -->
    <div class="font-sans antialiased text-slate-800 bg-[#e4e5e6] selection:bg-[#ab9159] selection:text-white overflow-x-hidden">
      
      <!-- NAV BAR (Transição Suave e Blur) -->
      <nav [class]="navClasses()" class="fixed w-full z-50 transition-all duration-700 ease-out border-b border-white/5">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between items-center h-24">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer group" (click)="scrollTo('home')">
              <div class="w-12 h-12 bg-gradient-to-br from-[#ab9159] to-[#8a7342] rounded-sm flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105">
                <span class="text-white font-serif font-bold text-2xl">JC</span>
              </div>
              <div class="flex flex-col">
                <span [class]="isScrolled() ? 'text-slate-900' : 'text-white'" class="font-serif font-bold text-lg tracking-[0.2em] transition-colors duration-500">
                  PREMIUM
                </span>
                <span [class]="isScrolled() ? 'text-[#ab9159]' : 'text-[#e4e5e6]'" class="text-[0.6rem] uppercase tracking-[0.3em] transition-colors duration-500">
                  Corretora
                </span>
              </div>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-12 items-center">
              <a (click)="scrollTo('about')" class="nav-link cursor-pointer text-sm tracking-widest uppercase transition-all duration-500" [class.text-slate-800]="isScrolled()" [class.text-white]="!isScrolled()">Quem Somos</a>
              <a (click)="scrollTo('services')" class="nav-link cursor-pointer text-sm tracking-widest uppercase transition-all duration-500" [class.text-slate-800]="isScrolled()" [class.text-white]="!isScrolled()">Seguros</a>
              <a (click)="scrollTo('credit')" class="nav-link cursor-pointer text-sm tracking-widest uppercase transition-all duration-500" [class.text-slate-800]="isScrolled()" [class.text-white]="!isScrolled()">Consórcios</a>
              
              <button (click)="scrollTo('contact')" 
                class="px-8 py-3 border border-[#ab9159] text-[#ab9159] font-medium rounded-sm hover:bg-[#ab9159] hover:text-white transition-all duration-500 uppercase tracking-widest text-xs relative overflow-hidden group">
                <span class="relative z-10">Fale Conosco</span>
                <div class="absolute inset-0 bg-[#ab9159] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </button>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center">
              <button (click)="toggleMobileMenu()" [class]="isScrolled() ? 'text-slate-900' : 'text-white'">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Mobile Menu Dropdown -->
        <div *ngIf="mobileMenuOpen()" class="md:hidden bg-[#e4e5e6] shadow-2xl absolute w-full border-t border-gray-200">
          <div class="px-6 pt-4 pb-8 space-y-4">
            <a (click)="scrollTo('about'); toggleMobileMenu()" class="block text-slate-800 text-lg font-serif tracking-widest">Quem Somos</a>
            <a (click)="scrollTo('services'); toggleMobileMenu()" class="block text-slate-800 text-lg font-serif tracking-widest">Seguros</a>
            <a (click)="scrollTo('credit'); toggleMobileMenu()" class="block text-slate-800 text-lg font-serif tracking-widest">Consórcios</a>
            <a (click)="scrollTo('contact'); toggleMobileMenu()" class="block text-[#ab9159] font-bold text-lg font-serif tracking-widest">Contato</a>
          </div>
        </div>
      </nav>

      <!-- HERO SECTION (Cinematic) -->
      <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
        <!-- Parallax Background -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-black/40 z-10"></div> <!-- Overlay mais suave -->
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
               alt="Luxury Architecture" 
               class="w-full h-full object-cover object-center scale-105 animate-slow-zoom" />
        </div>

        <!-- Content -->
        <div class="relative z-20 max-w-7xl mx-auto px-6 text-center w-full mt-10">
          <div #animItem class="opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
            <div class="inline-flex items-center gap-4 mb-8">
              <div class="h-[1px] w-12 bg-[#ab9159]"></div>
              <span class="text-[#e4e5e6] text-xs font-bold tracking-[0.4em] uppercase">Excelência em Proteção</span>
              <div class="h-[1px] w-12 bg-[#ab9159]"></div>
            </div>
            
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-tight mb-8">
              Patrimônio <br />
              <span class="italic font-light text-[#ab9159]">&</span> Legado
            </h1>
            
            <p class="text-lg md:text-xl text-[#e4e5e6] mb-12 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Estratégia e responsabilidade para blindar o que você construiu. 
              Uma curadoria de seguros feita para quem exige o melhor.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button (click)="scrollTo('services')" class="px-10 py-4 bg-[#ab9159] text-white font-medium rounded-sm shadow-xl hover:bg-[#8a7342] transition-all duration-500 uppercase tracking-[0.2em] text-xs transform hover:-translate-y-1">
                Nossas Soluções
              </button>
              <button (click)="scrollTo('about')" class="group flex items-center gap-3 text-white uppercase tracking-[0.2em] text-xs hover:text-[#ab9159] transition-colors duration-300">
                Conheça a JC
                <span class="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce duration-[2000ms]">
          <div class="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#ab9159] to-transparent"></div>
        </div>
      </section>

      <!-- QUEM SOMOS (Layout Assimétrico Premium) -->
      <section id="about" class="py-32 bg-white relative overflow-hidden">
        <!-- Decorative Background Element -->
        <div class="absolute top-0 right-0 w-1/3 h-full bg-[#e4e5e6]/30 hidden lg:block"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <!-- Content -->
            <div #animItem class="order-2 lg:order-1 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <h2 class="text-[#ab9159] font-bold uppercase tracking-[0.3em] text-xs mb-4">Sobre a JC Premium</h2>
              <h3 class="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-8 leading-tight">
                Protegendo vidas com <span class="italic text-[#ab9159]">estratégia</span> e excelência.
              </h3>
              
              <div class="space-y-6 text-slate-600 font-light leading-loose text-lg text-justify">
                <p>
                  A <strong class="text-slate-900 font-medium">JC Premium Corretora de Seguros</strong> nasceu de um propósito inegociável: elevar o padrão de proteção patrimonial e familiar. Fundada por <strong class="text-slate-900 font-medium">Jacqueline Fitl</strong>, nossa trajetória é marcada pela expertise técnica e relacionamentos de confiança.
                </p>
                <p>
                  Com registro <strong class="text-[#ab9159]">SUSEP</strong> e uma atuação consolidada desde 2017, oferecemos uma consultoria "boutique", onde cada cliente recebe uma análise profunda de riscos e soluções desenhadas sob medida.
                </p>
              </div>

              <div class="mt-12 flex items-center gap-12">
                <div>
                  <span class="block text-4xl font-serif text-[#ab9159] mb-1">2017</span>
                  <span class="text-xs uppercase tracking-widest text-slate-400">Início da Jornada</span>
                </div>
                <div class="w-[1px] h-12 bg-slate-200"></div>
                <div>
                  <span class="block text-4xl font-serif text-[#ab9159] mb-1">+10k</span>
                  <span class="text-xs uppercase tracking-widest text-slate-400">Vidas Seguradas</span>
                </div>
              </div>
            </div>

            <!-- Image Composition -->
            <div #animItem class="order-1 lg:order-2 relative group opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
              <div class="absolute -inset-4 border border-[#ab9159]/30 rounded-sm translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div class="relative h-[600px] w-full overflow-hidden rounded-sm shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                     alt="Jacqueline Fitl" 
                     class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                 <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                 
                 <div class="absolute bottom-8 left-8 text-white">
                   <p class="font-serif text-2xl italic">Jacqueline Fitl</p>
                   <p class="text-xs uppercase tracking-widest text-[#ab9159] mt-1">Fundadora & CEO</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SERVICES (Cards Elegantes) -->
      <section id="services" class="py-32 bg-[#e4e5e6]">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-20 max-w-3xl mx-auto" #animItem class="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <span class="text-[#ab9159] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Portfólio Exclusivo</span>
            <h3 class="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-6">Proteções sob Medida</h3>
            <div class="w-24 h-[1px] bg-[#ab9159] mx-auto"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (service of services; track service.title; let i = $index) {
              <div #animItem class="bg-white p-10 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden opacity-0 translate-y-10 ease-out" [style.transitionDelay]="i * 100 + 'ms'">
                <!-- Hover Line Top -->
                <div class="absolute top-0 left-0 w-full h-1 bg-[#ab9159] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                
                <div class="mb-8 relative">
                  <div class="w-16 h-16 bg-[#e4e5e6] rounded-full flex items-center justify-center group-hover:bg-[#ab9159] transition-colors duration-500">
                    <div class="text-[#ab9159] group-hover:text-white transition-colors duration-500" [innerHTML]="service.icon"></div>
                  </div>
                </div>

                <h4 class="text-2xl font-serif font-medium text-slate-900 mb-4">{{service.title}}</h4>
                <p class="text-slate-500 mb-8 text-sm leading-relaxed font-light">{{service.description}}</p>
                
                <ul class="space-y-3 border-t border-slate-100 pt-6">
                  @for (detail of service.details; track detail) {
                    <li class="flex items-center text-sm text-slate-600 font-light group-hover:translate-x-1 transition-transform duration-300">
                      <span class="w-1.5 h-1.5 bg-[#ab9159] rounded-full mr-3"></span>
                      {{detail}}
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CONSÓRCIOS (Dark Mode Luxury) -->
      <section id="credit" class="py-32 bg-[#1a1a1a] text-white relative overflow-hidden">
        <!-- Abstract Gold Flow -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div class="absolute -top-[20%] -right-[20%] w-[800px] h-[800px] rounded-full bg-[#ab9159] blur-[120px]"></div>
          <div class="absolute -bottom-[20%] -left-[20%] w-[600px] h-[600px] rounded-full bg-[#e4e5e6] blur-[100px] opacity-20"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10 border-b border-white/10 pb-10" #animItem class="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div class="max-w-2xl">
              <span class="text-[#ab9159] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Investimento Inteligente</span>
              <h3 class="text-4xl md:text-6xl font-serif font-medium mb-6">Cartas de Crédito</h3>
              <p class="text-[#e4e5e6] text-lg font-light leading-relaxed">
                A maneira mais sofisticada de alavancar seu patrimônio. <br/>
                Sem juros bancários, apenas planejamento estratégico.
              </p>
            </div>
            <button class="px-8 py-4 border border-[#ab9159] text-[#ab9159] hover:bg-[#ab9159] hover:text-white transition-all duration-500 uppercase text-xs tracking-[0.2em] font-bold">
              Solicitar Simulação
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Auto -->
            <div #animItem class="bg-white/5 backdrop-blur-md p-10 border border-white/5 hover:border-[#ab9159]/50 transition-colors duration-500 opacity-0 translate-y-10 ease-out delay-100 group">
              <div class="flex items-center justify-between mb-8">
                <h4 class="text-3xl font-serif text-white group-hover:text-[#ab9159] transition-colors">Automóvel</h4>
                <span class="text-4xl">🚗</span>
              </div>
              
              <p class="text-gray-400 mb-8 font-light h-16">Poder de compra à vista para negociar seu veículo novo ou seminovo com total liberdade.</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 bg-white/5 border-l-2 border-[#ab9159]">
                  <span class="block text-[#ab9159] font-bold text-xs uppercase tracking-wider mb-1">Sem Juros</span>
                  <span class="text-xs text-gray-400">Taxa administrativa justa.</span>
                </div>
                <div class="p-4 bg-white/5 border-l-2 border-[#ab9159]">
                  <span class="block text-[#ab9159] font-bold text-xs uppercase tracking-wider mb-1">Flexibilidade</span>
                  <span class="text-xs text-gray-400">Sorteio ou Lance.</span>
                </div>
              </div>
            </div>

            <!-- Imóvel -->
            <div #animItem class="bg-white/5 backdrop-blur-md p-10 border border-white/5 hover:border-[#ab9159]/50 transition-colors duration-500 opacity-0 translate-y-10 ease-out delay-200 group">
              <div class="flex items-center justify-between mb-8">
                <h4 class="text-3xl font-serif text-white group-hover:text-[#ab9159] transition-colors">Imóvel</h4>
                <span class="text-4xl">🏠</span>
              </div>
              
              <p class="text-gray-400 mb-8 font-light h-16">Compra, construção, reforma ou alavancagem patrimonial. Seu imóvel se pagando sozinho.</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 bg-white/5 border-l-2 border-[#ab9159]">
                  <span class="block text-[#ab9159] font-bold text-xs uppercase tracking-wider mb-1">Alavancagem</span>
                  <span class="text-xs text-gray-400">Multiplique seu patrimônio.</span>
                </div>
                <div class="p-4 bg-white/5 border-l-2 border-[#ab9159]">
                  <span class="block text-[#ab9159] font-bold text-xs uppercase tracking-wider mb-1">Liquidez</span>
                  <span class="text-xs text-gray-400">Capital de giro barato.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer id="contact" class="bg-[#111] text-gray-400 pt-24 pb-12 border-t border-[#333]">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            <!-- Brand -->
            <div class="col-span-1 lg:col-span-2">
              <div class="flex items-center gap-3 mb-8">
                <div class="w-10 h-10 bg-[#ab9159] rounded-sm flex items-center justify-center">
                  <span class="text-white font-serif font-bold text-xl">JC</span>
                </div>
                <span class="text-white font-serif font-bold text-xl tracking-[0.2em]">PREMIUM</span>
              </div>
              <p class="mb-8 max-w-sm text-sm font-light leading-relaxed text-gray-500">
                Uma corretora boutique dedicada a oferecer as melhores soluções em seguros e consórcios do mercado brasileiro.
              </p>
              <div class="flex space-x-6">
                <a href="https://www.instagram.com/jcpremiumcorretora" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ab9159] hover:text-white transition-all duration-300">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/jacquelinefitl/" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ab9159] hover:text-white transition-all duration-300">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

            <!-- Contacts -->
            <div>
              <h4 class="text-white font-serif font-bold text-lg mb-8">Atendimento</h4>
              <ul class="space-y-6 text-sm font-light">
                <li class="flex items-center gap-4 group cursor-pointer">
                  <span class="text-[#ab9159] group-hover:scale-110 transition-transform">📞</span> 
                  <span class="group-hover:text-white transition-colors">(65) 99298-5651</span>
                </li>
                <li class="flex items-center gap-4 group cursor-pointer">
                  <span class="text-[#ab9159] group-hover:scale-110 transition-transform">📞</span> 
                  <span class="group-hover:text-white transition-colors">(65) 99214-8174</span>
                </li>
                <li class="flex items-center gap-4 group cursor-pointer">
                  <span class="text-[#ab9159] group-hover:scale-110 transition-transform">✉️</span> 
                  <span class="group-hover:text-white transition-colors">jcpremiumseguros&#64;gmail.com</span>
                </li>
              </ul>
            </div>

            <!-- Links -->
            <div>
              <h4 class="text-white font-serif font-bold text-lg mb-8">Explorar</h4>
              <ul class="space-y-4 text-sm font-light">
                <li><a (click)="scrollTo('home')" class="hover:text-[#ab9159] cursor-pointer transition-colors block transform hover:translate-x-1 duration-300">Início</a></li>
                <li><a (click)="scrollTo('about')" class="hover:text-[#ab9159] cursor-pointer transition-colors block transform hover:translate-x-1 duration-300">Quem Somos</a></li>
                <li><a (click)="scrollTo('services')" class="hover:text-[#ab9159] cursor-pointer transition-colors block transform hover:translate-x-1 duration-300">Seguros</a></li>
                <li><a (click)="scrollTo('credit')" class="hover:text-[#ab9159] cursor-pointer transition-colors block transform hover:translate-x-1 duration-300">Consórcios</a></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light tracking-wider">
            <p>&copy; 2024 JC Premium Corretora de Seguros. Todos os direitos reservados.</p>
            <p class="mt-2 md:mt-0">Design by Devinho</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    /* Animação personalizada de Zoom Lento para o Hero */
    @keyframes slowZoom {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }
    .animate-slow-zoom {
      animation: slowZoom 20s infinite alternate linear;
    }

    /* Utilitário para o efeito de Reveal */
    .reveal-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `]
})
export class App implements AfterViewInit {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  @ViewChildren('animItem') animItems!: QueryList<ElementRef>;

  // Ícones SVG minimalistas
  icons = {
    heart: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    shield: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    briefcase: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    home: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    scale: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    activity: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
  };

  services: ServiceItem[] = [
    {
      title: 'Seguro de Vida',
      description: 'Proteção familiar e sucessória. Garanta o futuro de quem você ama com liquidez imediata e segurança.',
      icon: this.icons.heart,
      details: ['Morte (Natural ou Acidental)', 'Invalidez Permanente', 'Doenças Graves', 'Diária por Incapacidade (DIT)']
    },
    {
      title: 'Responsabilidade Civil',
      description: 'Blindagem patrimonial para profissionais. Ideal para médicos, dentistas e advogados protegerem sua reputação.',
      icon: this.icons.scale,
      details: ['Danos Materiais e Morais', 'Custas Judiciais', 'Defesa Profissional (E&O)', 'Gestão de Crise']
    },
    {
      title: 'Seguro Empresarial',
      description: 'Proteção completa para o seu negócio. Evite prejuízos operacionais e garanta a continuidade da empresa.',
      icon: this.icons.briefcase,
      details: ['Incêndio e Explosão', 'Lucros Cessantes', 'Roubo e Furto', 'Responsabilidade Civil']
    },
    {
      title: 'Seguro Residencial',
      description: 'A base do seu patrimônio protegida contra imprevistos, com assistências que facilitam o seu dia a dia.',
      icon: this.icons.home,
      details: ['Incêndio e Queda de Raio', 'Danos Elétricos', 'RC Familiar', 'Assistência 24h']
    },
    {
      title: 'Seguro Saúde',
      description: 'Acesso à medicina de ponta para você, sua família ou colaboradores, com gestão eficiente.',
      icon: this.icons.activity,
      details: ['Rede Premium', 'Reembolso Ágil', 'Cobertura Nacional', 'Medicina Preventiva']
    },
    {
      title: 'Seguro Auto',
      description: 'Tranquilidade nas estradas e na cidade. Proteção total para seu veículo com suporte VIP.',
      icon: this.icons.shield,
      details: ['Colisão e Roubo', 'Danos a Terceiros', 'Carro Reserva', 'Vidros e Faróis']
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // Optional: stop observing once revealed
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    this.animItems.forEach(item => {
      observer.observe(item.nativeElement);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  // Correção: Método adicionado para retornar as classes dinâmicas da barra de navegação
  navClasses() {
    return this.isScrolled()
      ? 'bg-[#e4e5e6]/95 backdrop-blur-md shadow-lg py-0'
      : 'bg-transparent py-4';
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
}