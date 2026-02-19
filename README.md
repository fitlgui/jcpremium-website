# JC Premium - Website Institucional

> Website institucional da JC Premium Corretora de Seguros, desenvolvido com Angular e TailwindCSS.

## 📋 Sobre o Projeto

Este é um website institucional moderno e elegante desenvolvido para a JC Premium Corretora de Seguros. O projeto foi estruturado de forma modular para facilitar manutenção e expansão futura.

## 🏗️ Arquitetura

O projeto é dividido em módulos independentes, seguindo as melhores práticas do Angular:

### **App Module (Principal)**
Módulo raiz da aplicação que contém toda a landing page institucional.

**Responsabilidades:**
- Landing page principal com design elegante e minimalista
- Apresentação da empresa e seus pilares de atuação
- Seções informativas:
  - **Hero Section**: Destaque principal com call-to-action
  - **Pilares**: Apresentação dos 3 pilares de serviços (Seguros Pessoais, Patrimoniais e Consórcios)
  - **Quem Somos**: História da empresa, estatísticas e diferenciais
  - **Parceiros Estratégicos**: Apresentação das seguradoras parceiras
  - **Consórcios**: Detalhamento de cartas de crédito (Automóvel e Imóvel)
  - **Contato**: Footer com informações de contato e redes sociais
- Sistema de navegação âncora entre seções
- Animações e transições suaves ao scroll
- Menu responsivo para mobile

### **Bio Module**
Módulo lazy-loaded que funciona como página de links (tipo "Link in Bio").

**Responsabilidades:**
- Página centralizada de links importantes
- Links diretos para WhatsApp, Instagram e outras redes sociais
- Design minimalista e mobile-first
- Carregamento sob demanda (lazy loading) para otimização

**Rota:** `/bio`

## 🛠️ Tecnologias Utilizadas

- **Angular 16.2** - Framework principal
- **TypeScript 5.1** - Linguagem de programação
- **TailwindCSS 3.4** - Framework CSS utilitário
- **Angular Animations** - Animações e transições
- **RxJS 7.8** - Programação reativa

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório (se aplicável)
git clone <url-do-repositorio>

# Navegar até a pasta do projeto
cd site

# Instalar dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm start
# ou
ng serve
```

Acesse `http://localhost:4200/` no navegador.

### Build de Produção

```bash
npm run build
# ou
ng build
```

Os arquivos compilados estarão na pasta `dist/`.

## 📁 Estrutura de Pastas

```
site/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Componente principal
│   │   ├── app.component.html        # Template da landing page
│   │   ├── app.component.scss        # Estilos do componente principal
│   │   ├── app.module.ts             # Módulo raiz
│   │   ├── app-routing.module.ts     # Configuração de rotas
│   │   │
│   │   └── bio/                      # Módulo Bio
│   │       ├── bio.component.ts      # Lógica do componente
│   │       ├── bio.component.html    # Template da página de links
│   │       ├── bio.component.scss    # Estilos do bio
│   │       ├── bio.module.ts         # Módulo Bio
│   │       └── bio-routing.module.ts # Rotas do Bio
│   │
│   ├── assets/                       # Recursos estáticos (imagens, logos)
│   ├── styles.scss                   # Estilos globais
│   └── index.html                    # HTML raiz
│
├── angular.json                      # Configuração do Angular CLI
├── tailwind.config.js                # Configuração do TailwindCSS
├── package.json                      # Dependências e scripts
└── tsconfig.json                     # Configuração TypeScript
```

## 🎨 Personalização

### Cores do Tema

As cores principais estão definidas nas classes TailwindCSS:
- **Primária (Dourado)**: `#ab9159`
- **Primária Hover**: `#8a7342`
- **Texto**: `slate-900`
- **Background**: `white` / `slate-50`

Para alterar, edite o arquivo `tailwind.config.js`.

### Conteúdo

O conteúdo das seções está em:
- **Landing Page**: `src/app/app.component.ts` e `src/app/app.component.html`
- **Bio Links**: `src/app/bio/bio.component.ts`

## 🔄 Possibilidades de Expansão

O projeto foi estruturado para facilitar expansões futuras. Aqui estão algumas sugestões:

### 1. **Módulo de Blog**
```typescript
// Exemplo de estrutura
blog/
├── blog.module.ts
├── blog-routing.module.ts
├── components/
│   ├── blog-list/
│   ├── blog-post/
│   └── blog-card/
└── services/
    └── blog.service.ts
```

### 2. **Módulo de Simulação de Seguros**
```typescript
// Exemplo de estrutura
simulacao/
├── simulacao.module.ts
├── simulacao-routing.module.ts
├── components/
│   ├── formulario-auto/
│   ├── formulario-residencial/
│   └── resultado-simulacao/
└── services/
    └── simulacao.service.ts
```

### 3. **Módulo de Área do Cliente**
```typescript
// Exemplo de estrutura
cliente/
├── cliente.module.ts
├── cliente-routing.module.ts
├── components/
│   ├── login/
│   ├── dashboard/
│   ├── apolices/
│   └── documentos/
└── services/
    ├── auth.service.ts
    └── cliente.service.ts
```

### 4. **Módulo de Cotações Online**
```typescript
// Exemplo de estrutura
cotacoes/
├── cotacoes.module.ts
├── cotacoes-routing.module.ts
├── components/
│   ├── nova-cotacao/
│   ├── minhas-cotacoes/
│   └── detalhes-cotacao/
└── services/
    └── cotacao.service.ts
```

### 5. **Integração com Backend**

Para adicionar integração com API:

```typescript
// Criar um serviço compartilhado
// src/app/core/services/api.service.ts

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  get(endpoint: string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }
  
  post(endpoint: string, data: any) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }
}
```

### 6. **Módulo de Depoimentos**

Adicionar uma seção de depoimentos de clientes com gerenciamento dinâmico.

### 7. **Sistema de Newsletter**

Integrar um formulário de inscrição para newsletter com envio para serviços como Mailchimp ou SendGrid.

### 8. **Chat em Tempo Real**

Integração com plataformas de chat como Zendesk, Intercom ou desenvolvimento customizado.

## 📝 Convenções de Código

- **Componentes**: PascalCase (ex: `BioComponent`)
- **Arquivos**: kebab-case (ex: `bio.component.ts`)
- **Classes CSS**: Tailwind utility-first
- **Interfaces**: PascalCase com prefixo descritivo (ex: `BioLink`)

## 🧪 Testes

```bash
# Executar testes unitários
npm test
# ou
ng test
```

## 📦 Scripts Disponíveis

- `npm start` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run watch` - Build com watch mode
- `npm test` - Executa testes unitários

## 👨‍💻 Desenvolvedor

**Guilherme Fitl**
- LinkedIn: [@guilhermefitl](https://www.linkedin.com/in/guilhermefitl/)

## 📄 Licença

Este projeto é propriedade da JC Premium Corretora de Seguros.

---

**Versão:** 0.0.0  
**Última atualização:** Fevereiro 2026
