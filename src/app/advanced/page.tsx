'use client';

import React, { useRef, useState } from 'react';
import { useVLibrasPlayer } from 'vlibras-player-nextjs';
import Link from 'next/link';

export default function AdvancedExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [showSubtitles, setShowSubtitles] = useState(true);

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
    containerRef: containerRef as React.RefObject<HTMLElement> // ✅ Nova API v2.1.0
  });

  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setIsTranslating(true);
    try {
      await translate(text);
    } catch (error) {
      console.error('Erro na tradução:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    // Funcionalidade de velocidade pode ser implementada conforme a API da biblioteca
  };

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    // Funcionalidade de legendas pode ser implementada conforme a API da biblioteca
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          🚀 VLibras Player - Exemplo Avançado
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          {/* Player */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Player VLibras
            </h2>
            <div 
              ref={containerRef} 
              className="w-full h-80 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-4"
            >
              {isLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-gray-600 dark:text-gray-300">Carregando player...</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    Player VLibras (Hook useVLibrasPlayer)
                  </p>
                  <p className="text-xs text-gray-400">
                    Player inicializado automaticamente
                  </p>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900 rounded text-red-800 dark:text-red-200 text-xs">
                {error}
              </div>
            )}
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Texto para traduzir:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o texto para traduzir para Libras..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Playback Controls */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Controles de Reprodução
              </h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating || !text.trim() || isLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  {isTranslating ? 'Traduzindo...' : 'Traduzir'}
                </button>
                
                <button
                  onClick={() => play()}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Play
                </button>
                
                <button
                  onClick={() => pause()}
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Pausar
                </button>
                
                <button
                  onClick={() => stop()}
                  disabled={isLoading}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Parar
                </button>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Configurações
              </h3>
              
              {/* Speed Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Velocidade: {speed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5x</span>
                  <span>1.0x</span>
                  <span>2.0x</span>
                </div>
              </div>

              {/* Subtitle Toggle */}
              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSubtitles}
                    onChange={toggleSubtitles}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mostrar legendas
                  </span>
                </label>
              </div>

              {/* Status Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      isLoading ? 'bg-yellow-100 text-yellow-800' : 
                      error ? 'bg-red-100 text-red-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {isLoading ? 'Carregando' : error ? 'Erro' : 'Pronto'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Carregado:</span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {player?.loaded ? 'Sim' : 'Não'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              Exemplos Rápidos
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                'Bem-vindos ao sistema de acessibilidade digital.',
                'Esta é uma demonstração da tradução para Libras.',
                'A tecnologia assistiva é fundamental para a inclusão.',
                'VLibras torna conteúdo digital acessível para surdos.',
                'Obrigado por testar nossa aplicação!',
                'Acessibilidade é um direito de todos.'
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setText(example)}
                  className="text-left p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            ← Voltar ao exemplo básico
          </Link>
        </div>
      </div>
    </div>
  );
}
