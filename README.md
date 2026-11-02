# JC Premium · Jacqueline Fitl

Site institucional em Angular 16, com página principal e página de links em `/bio`.

## Executar

- `npm ci`
- `npm start` — desenvolvimento em http://localhost:4200
- `npm run build` — produção em `dist/`
- `npm test -- --watch=false --browsers=ChromeHeadless` — testes dos fluxos

A hospedagem precisa redirecionar URLs de navegação como `/bio` para `index.html`.

## Experiência

Identidade em vinho, dourado e off-white; retrato real da fundadora; soluções em abas acessíveis por teclado; roteiro de duas perguntas com mensagem personalizada para WhatsApp; trajetória com fontes; podcast com reprodução sob demanda; parceiros; Instagram; perguntas frequentes; navegação para celular e preferências de movimento reduzido.

O roteiro funciona no navegador e não armazena dados. Apenas o clique do visitante abre o WhatsApp com as escolhas na mensagem; o visitante decide enviá-la. Não há backend, formulário de captação ou cotação automática. O áudio é servido pela plataforma do Canal Corretor e só é carregado quando solicitado.

## Conteúdo e fontes

Consulte [CONTENT-SOURCES.md](CONTENT-SOURCES.md). As parcerias foram preservadas do site anterior. A pesquisa pública não permitiu leitura integral dos perfis do Instagram; a reformulação não representa um inventário completo de premiações. Novas conquistas devem ser incluídas com título, instituição, data e fonte, distinguindo prêmios de participações em eventos.

As regras de estilo específicas da página principal têm limite de aviso de 16 kB e limite de erro de 20 kB para acomodar os novos blocos responsivos. O limite do pacote inicial foi preservado.
