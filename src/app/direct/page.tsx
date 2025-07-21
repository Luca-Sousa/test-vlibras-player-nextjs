'use client';

import React, { useRef, useEffect, useState } from 'react';
import { VLibrasPlayer } from 'vlibras-player-nextjs';
import Link from 'next/link';

export default function DirectUsagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VLibrasPlayer | null>(null);
  const [text, setText] = useState('Exemplo de uso direto da classe VLibrasPlayer.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [playerStatus, setPlayerStatus] = useState('Não inicializado');

  useEffect(() => {
    if (containerRef.current) {
      try {
        // Inicializar o player diretamente
        playerRef.current = new VLibrasPlayer({
          targetPath: '/vlibras/target',
          translatorUrl: 'https://api.vlibras.gov.br',
          region: 'BR',
          enableStats: true
        });
        
        playerRef.current.load(containerRef.current);
        setPlayerStatus('Carregado');
      } catch (error) {
        console.error('Erro ao inicializar player:', error);
        setPlayerStatus('Erro na inicialização');
      }
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        try {
          // Cleanup será feito automaticamente
          playerRef.current = null;
        } catch (error) {
          console.error('Erro no cleanup:', error);
        }
      }
    };
  }, []);

  const handleTranslate = async () => {
    if (!text.trim() || !playerRef.current) return;
    
    setIsTranslating(true);
    try {
      await playerRef.current.translate(text);
      setPlayerStatus('Tradução concluída');
    } catch (error) {
      console.error('Erro na tradução:', error);
      setPlayerStatus('Erro na tradução');
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePlay = () => {
    if (playerRef.current) {
      try {
        playerRef.current.play();
        setPlayerStatus('Reproduzindo');
      } catch (error) {
        console.error('Erro ao reproduzir:', error);
      }
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      try {
        playerRef.current.pause();
        setPlayerStatus('Pausado');
      } catch (error) {
        console.error('Erro ao pausar:', error);
      }
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      try {
        playerRef.current.stop();
        setPlayerStatus('Parado');
      } catch (error) {
        console.error('Erro ao parar:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🔧 Uso Direto da Classe VLibrasPlayer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Demonstração usando a classe VLibrasPlayer diretamente
          </p>
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Método: new VLibrasPlayer()
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          {/* Player Container */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              📺 Player VLibras (Instância Direta)
            </h2>
            
            <div 
              ref={containerRef} 
              className="vlibras-container w-full h-80 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-4"
            >
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Player VLibras será carregado aqui<br/>
                <small>Usando new VLibrasPlayer()</small>
              </p>
            </div>

            {/* Status */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    playerStatus.includes('Erro') ? 'bg-red-100 text-red-800' :
                    playerStatus === 'Reproduzindo' ? 'bg-green-100 text-green-800' :
                    playerStatus === 'Pausado' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {playerStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Player:</span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {playerRef.current ? 'Instanciado' : 'Não instanciado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleTranslate}
                disabled={isTranslating || !text.trim() || !playerRef.current}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isTranslating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Traduzindo...
                  </>
                ) : (
                  <>
                    🔄 Traduzir
                  </>
                )}
              </button>
              
              <button
                onClick={handlePlay}
                disabled={!playerRef.current}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ▶️ Play
              </button>
              
              <button
                onClick={handlePause}
                disabled={!playerRef.current}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ⏸️ Pausar
              </button>
              
              <button
                onClick={handleStop}
                disabled={!playerRef.current}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ⏹️ Parar
              </button>
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Texto para tradução:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o texto para traduzir para Libras..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              💻 Código de Exemplo
            </h3>
            <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`// Uso direto da classe VLibrasPlayer
import { VLibrasPlayer } from 'vlibras-player-nextjs';

const player = new VLibrasPlayer({
  targetPath: '/vlibras/target',
  translatorUrl: 'https://api.vlibras.gov.br',
  region: 'BR',
  enableStats: true
});

// Carregar no container
player.load(containerElement);

// Traduzir texto
await player.translate('Olá mundo!');

// Controlar reprodução
player.play();
player.pause();
player.stop();

// Cleanup automático no React`}
            </pre>
          </div>

          {/* Quick Examples */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              📝 Textos de Exemplo
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                'Demonstração do uso direto da classe VLibrasPlayer.',
                'Este método oferece controle total sobre a instância.',
                'Ideal para casos de uso mais avançados.',
                'Lembre-se de chamar destroy() na cleanup.',
                'Configurações personalizadas podem ser passadas no construtor.'
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setText(example)}
                  className="text-left p-3 bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 border border-purple-200 dark:border-purple-700 rounded-lg transition-colors text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🏠 Página Inicial
          </Link>
          <Link
            href="/advanced"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🚀 Exemplo Avançado
          </Link>
        </div>
      </div>
    </div>
  );
}
