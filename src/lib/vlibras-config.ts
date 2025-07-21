// Exemplo de configurações avançadas para o VLibras Player NextJS

export interface VLibrasPlayerOptions {
  // Configuração básica
  translatorUrl?: string;          // URL do serviço de tradução
  targetPath?: string;             // Caminho para os arquivos Unity
  region?: 'BR' | 'PT';           // Região (Brasil ou Portugal)
  enableStats?: boolean;           // Habilitar estatísticas

  // Estilização
  className?: string;              // Classes CSS customizadas
  style?: React.CSSProperties;     // Estilos inline
  id?: string;                     // ID do elemento

  // Comportamento
  autoInit?: boolean;              // Inicialização automática
  initialText?: string;            // Texto inicial para traduzir

  // Callbacks de eventos
  onLoad?: () => void;             // Quando o player carrega
  onTranslateStart?: () => void;   // Início da tradução
  onTranslateEnd?: () => void;     // Fim da tradução
  onPlay?: () => void;             // Início da reprodução
  onPause?: () => void;            // Pausa da reprodução
  onEnd?: () => void;              // Fim da reprodução
  onError?: (error: string) => void; // Erro ocorrido
}

// Configuração padrão recomendada
export const defaultVLibrasConfig: VLibrasPlayerOptions = {
  translatorUrl: 'https://api.vlibras.gov.br',
  targetPath: '/vlibras/target',
  region: 'BR',
  enableStats: false,
  autoInit: true,
};

// Configuração para desenvolvimento
export const devVLibrasConfig: VLibrasPlayerOptions = {
  ...defaultVLibrasConfig,
  enableStats: true,
  onLoad: () => console.log('🎯 VLibras Player carregado'),
  onTranslateStart: () => console.log('🔄 Iniciando tradução'),
  onTranslateEnd: () => console.log('✅ Tradução concluída'),
  onPlay: () => console.log('▶️ Reproduzindo'),
  onPause: () => console.log('⏸️ Pausado'),
  onEnd: () => console.log('🏁 Reprodução finalizada'),
  onError: (error) => console.error('❌ Erro VLibras:', error),
};

// Configuração para produção
export const prodVLibrasConfig: VLibrasPlayerOptions = {
  ...defaultVLibrasConfig,
  enableStats: false,
  onError: (error) => {
    // Log para serviço de monitoramento em produção
    console.error('VLibras Error:', error);
  },
};

// Interface para configuração do webpack
interface WebpackConfig {
  resolve: {
    fallback: Record<string, boolean | string>;
  };
}

// Exemplo de uso com Next.js
export const nextConfigExample = {
  webpack: (config: WebpackConfig) => {
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

// Exemplo de componente customizado
export const ExampleUsageComponent = `
'use client';

import { useVLibrasPlayer } from 'vlibras-player-nextjs';
import { devVLibrasConfig } from './vlibras-config';

export default function MyVLibrasComponent() {
  const { 
    translate, 
    play, 
    pause, 
    stop, 
    player, 
    isLoading, 
    error 
  } = useVLibrasPlayer(devVLibrasConfig);

  const handleTranslate = async (text: string) => {
    try {
      await translate(text);
    } catch (err) {
      console.error('Erro na tradução:', err);
    }
  };

  return (
    <div>
      {/* Seu componente aqui */}
    </div>
  );
}
`;

// Interface para o player
interface PlayerInfo {
  loaded?: boolean;
  status?: string;
}

// Utilitários para desenvolvimento
export const VLibrasUtils = {
  // Verificar se WebGL está disponível
  isWebGLSupported: (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  },

  // Verificar se os arquivos Unity estão disponíveis
  checkUnityFiles: async (): Promise<boolean> => {
    const files = [
      '/vlibras/target/UnityLoader.js',
      '/vlibras/target/playerweb.json',
      '/vlibras/target/playerweb.data.unityweb',
      '/vlibras/target/playerweb.wasm.code.unityweb',
      '/vlibras/target/playerweb.wasm.framework.unityweb'
    ];

    try {
      const checks = await Promise.all(
        files.map(file => 
          fetch(file, { method: 'HEAD' })
            .then(res => res.ok)
            .catch(() => false)
        )
      );
      return checks.every(Boolean);
    } catch {
      return false;
    }
  },

  // Log de debug para desenvolvimento
  debugInfo: (player: PlayerInfo) => {
    console.group('🐛 VLibras Debug Info');
    console.log('Player loaded:', player?.loaded);
    console.log('Player status:', player?.status);
    console.log('WebGL supported:', VLibrasUtils.isWebGLSupported());
    console.groupEnd();
  }
};

// Export default
const vlibrasConfig = {
  defaultVLibrasConfig,
  devVLibrasConfig,
  prodVLibrasConfig,
  VLibrasUtils
};

export default vlibrasConfig;
