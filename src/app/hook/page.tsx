'use client';

import React, { useState, useRef } from 'react';
import { useVLibrasPlayer } from 'vlibras-player-nextjs';
import Link from 'next/link';

export default function HookUsagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('Demonstração do hook useVLibrasPlayer.');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const { 
    translate, 
    play, 
    pause, 
    stop, 
    player, 
    isLoading, 
    error 
  } = useVLibrasPlayer({
    autoInit: true,
    containerRef: containerRef as React.RefObject<HTMLElement>, // ✅ Nova API v2.1.0
    onLoad: () => console.log('🎯 Hook: Player carregado'),
    onTranslateStart: () => {
      console.log('🔄 Hook: Iniciando tradução');
      setIsTranslating(true);
    },
    onTranslateEnd: () => {
      console.log('✅ Hook: Tradução concluída');
      setIsTranslating(false);
    },
    onError: (error: string) => console.error('❌ Hook: Erro:', error),
  });

  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    try {
      await translate(text);
    } catch (error) {
      console.error('Erro na tradução:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-green-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            ⚛️ Hook useVLibrasPlayer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Demonstração do método recomendado (Hook React)
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Método: useVLibrasPlayer()
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          {/* Comparison Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              📊 Comparação dos Métodos
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Característica</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center bg-green-50 dark:bg-green-900">Hook (Recomendado)</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center bg-purple-50 dark:bg-purple-900">Classe Direta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Facilidade de Uso</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600">✅ Muito Fácil</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-yellow-600">⚠️ Médio</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Gerenciamento de Estado</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600">✅ Automático</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600">❌ Manual</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Cleanup</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600">✅ Automático</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600">❌ Manual</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Controle Avançado</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-yellow-600">⚠️ Limitado</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600">✅ Completo</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Inicialização</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600">✅ autoInit</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-yellow-600">⚠️ Manual</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Player Status */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              📺 Status do Player (Hook)
            </h2>
            
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">Carregando:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {isLoading ? 'Sim' : 'Não'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">Traduzindo:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    isTranslating ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isTranslating ? 'Sim' : 'Não'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">Player:</span>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">
                    {player ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </div>
              {error && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900 rounded text-red-800 dark:text-red-200 text-xs">
                  {error}
                </div>
              )}
            </div>

            {/* Virtual Player Display */}
            <div 
              ref={containerRef}
              className="vlibras-container w-full h-64 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🤟</div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Player VLibras (Hook useVLibrasPlayer)
                </p>
                <p className="text-xs text-gray-400">
                  {isLoading ? 'Inicializando...' : 
                   isTranslating ? 'Traduzindo...' : 
                   'Pronto para uso'}
                </p>
              </div>
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
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Controls */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              🎮 Controles
            </h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleTranslate}
                disabled={isTranslating || !text.trim() || isLoading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
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
                onClick={() => play()}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ▶️ Play
              </button>
              
              <button
                onClick={() => pause()}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ⏸️ Pausar
              </button>
              
              <button
                onClick={() => stop()}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ⏹️ Parar
              </button>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              💻 Código de Exemplo (Hook)
            </h3>
            <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`// Hook useVLibrasPlayer (Método Recomendado)
import { useVLibrasPlayer } from 'vlibras-player-nextjs';
import { useRef, useEffect } from 'react';

const containerRef = useRef<HTMLDivElement>(null);

const { 
  translate, 
  play, 
  pause, 
  stop, 
  player, 
  isLoading, 
  error 
} = useVLibrasPlayer({
  autoInit: true,
  onLoad: () => console.log('Player carregado'),
  onTranslateStart: () => console.log('Traduzindo...'),
  onTranslateEnd: () => console.log('Tradução concluída'),
  onError: (error) => console.error('Erro:', error)
});

// IMPORTANTE: Conectar o player ao container
useEffect(() => {
  if (containerRef.current && player) {
    player.load(containerRef.current);
  }
}, [player]);

// Traduzir texto
await translate('Olá mundo!');

// Controlar reprodução
play();
pause();
stop();`}
            </pre>
          </div>

          {/* Quick Examples */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              📝 Textos de Exemplo
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                'O hook useVLibrasPlayer é o método recomendado.',
                'Gerenciamento automático de estado e lifecycle.',
                'Callbacks integrados para todos os eventos.',
                'Inicialização automática com autoInit.',
                'Ideal para a maioria dos casos de uso.'
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setText(example)}
                  className="text-left p-3 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 border border-green-200 dark:border-green-700 rounded-lg transition-colors text-sm"
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
            href="/direct"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🔧 Uso Direto
          </Link>
          <Link
            href="/advanced"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🚀 Avançado
          </Link>
        </div>
      </div>
    </div>
  );
}
