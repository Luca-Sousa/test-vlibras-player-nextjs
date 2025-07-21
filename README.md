# 🤟 Teste VLibras Player NextJS

Este é um projeto de demonstração da biblioteca **vlibras-player-nextjs v2.0.0**, criado para testar e showcasing a integração do VLibras em aplicações Next.js.

## 📋 Sobre o Projeto

O projeto demonstra como usar a biblioteca `vlibras-player-nextjs` para adicionar tradução automática de texto para Libras (Língua Brasileira de Sinais) em aplicações Next.js.

## ✨ Funcionalidades Demonstradas

- ✅ Hook React (`useVLibrasPlayer`) para controle do player
- ✅ Tradução de texto para Libras
- ✅ Controles de reprodução (Play, Pause, Stop)
- ✅ Interface responsiva e acessível
- ✅ Textos pré-definidos para teste rápido
- ✅ Exemplo básico e avançado
- ✅ Suporte a tema escuro
- ✅ Status em tempo real do player

## 🚀 Como Executar

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo desenvolvimento:**
```bash
npm run dev
```

3. **Acessar no navegador:**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx          # Exemplo básico (corrigido)
│   ├── hook/
│   │   └── page.tsx      # Demonstração detalhada do hook
│   ├── advanced/
│   │   └── page.tsx      # Exemplo avançado (corrigido)
│   ├── direct/
│   │   └── page.tsx      # Uso direto da classe (funcional)
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── vlibras-config.ts # Configurações e utilitários
public/
└── vlibras/
    └── target/           # Arquivos Unity do VLibras (não incluídos)
```

## 🔧 Configuração

### Next.js

O projeto inclui configurações específicas no `next.config.ts` para suporte ao WebGL/Unity:

```typescript
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  
  async headers() {
    return [
      {
        source: '/vlibras/target/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};
```

### Arquivos Unity

Para funcionamento completo, os arquivos Unity do VLibras devem ser colocados em `public/vlibras/target/`:

- `UnityLoader.js`
- `playerweb.json`
- `playerweb.data.unityweb`
- `playerweb.wasm.code.unityweb`
- `playerweb.wasm.framework.unityweb`

## 📦 Biblioteca Testada

- **Nome:** `vlibras-player-nextjs`
- **Versão:** `2.0.0`
- **NPM:** [https://www.npmjs.com/package/vlibras-player-nextjs](https://www.npmjs.com/package/vlibras-player-nextjs)
- **GitHub:** [https://github.com/Luca-Sousa/vlibras-player-web-nextjs](https://github.com/Luca-Sousa/vlibras-player-web-nextjs)

## 🎯 Exemplos de Uso

### Hook React (Recomendado)

```tsx
import { useVLibrasPlayer } from 'vlibras-player-nextjs';

const { translate, play, pause, stop, player, isLoading, error } = useVLibrasPlayer({
  autoInit: true
});

// Traduzir texto
await translate('Olá mundo!');

// Controlar reprodução
play();
pause();
stop();
```

## 🌟 Características da Biblioteca

- 🚀 Compatível com Next.js 13+ (App Router e Pages Router)
- 🔷 TypeScript nativo com tipagem completa
- ⚛️ Hooks React modernos para fácil integração
- 🎨 Componentes estilizados prontos para uso
- 📱 Design responsivo e acessível
- 🌙 Suporte a tema escuro
- 🔧 API moderna e fácil de usar
- 📦 Tree-shaking otimizado

## 🤝 Sobre o VLibras

O VLibras é uma suíte de ferramentas computacionais de código aberto que traduz conteúdos digitais (texto, áudio e vídeo) para Libras, tornando-os acessíveis para pessoas surdas.

- **Site oficial:** [https://www.vlibras.gov.br/](https://www.vlibras.gov.br/)
- **Desenvolvido por:** Laboratório de Aplicações de Vídeo Digital (LAVID) da UFPB

## 📄 Licença

Este projeto de teste está sob a mesma licença da biblioteca original: **LGPL-3.0**

## 👥 Créditos

- **Biblioteca:** [Luca Sousa](https://github.com/Luca-Sousa) - vlibras-player-nextjs
- **VLibras Original:** Equipe VLibras - UFPB/LAVID
- **Framework:** Next.js Team

---

**Feito com ❤️ para democratizar o acesso à Libras na web**
