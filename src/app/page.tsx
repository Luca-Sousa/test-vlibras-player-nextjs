'use client';

import React, { useRef, useState } from 'react';
import { useVLibrasPlayer } from 'vlibras-player-nextjs';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('Olá! Bem-vindo ao teste do VLibras Player NextJS.');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const { 
    translate, 
    play, 
    pause, 
    stop, 
    isLoading, 
    error,
  } = useVLibrasPlayer({
    autoInit: true,
    containerRef: containerRef as React.RefObject<HTMLElement>,
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

  const predefinedTexts = [
    'Olá! Como você está?',
    'Bem-vindos ao VLibras Player NextJS!',
    'Esta é uma demonstração da biblioteca de tradução para Libras.',
    'A acessibilidade é fundamental para uma web inclusiva.',
    'Obrigado por testar nossa biblioteca!'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🤟 VLibras Player NextJS
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Teste da biblioteca de tradução para Libras
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Versão: 2.1.1 🔧 (Problema de duplicação corrigido!)
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Container - Ocupa 2 colunas */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              📺 Player VLibras
            </h2>

            <div
              ref={containerRef}
              className="flex-1 w-full lg:max-h-[355px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
            >
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Carregando player...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mt-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    Status:
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      isLoading
                        ? "bg-yellow-100 text-yellow-800"
                        : error
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {isLoading ? "Carregando" : error ? "Erro" : "Pronto"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    Versão:
                  </span>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">
                    v2.1.1 (Corrigida)
                  </span>
                </div>
              </div>
              {error && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900 rounded text-red-800 dark:text-red-200 text-xs">
                  {error}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleTranslate}
                disabled={isTranslating || !text.trim() || isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isTranslating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Traduzindo...
                  </>
                ) : (
                  <>🔄 Traduzir</>
                )}
              </button>

              <button
                onClick={() => play()}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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

          {/* Text Input and Controls - Ocupa 1 coluna */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              ✏️ Texto para Tradução
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Digite ou selecione um texto:
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Digite o texto para traduzir para Libras..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              {/* Predefined Texts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Textos pré-definidos:
                </label>
                <div className="grid gap-2">
                  {predefinedTexts.map((predefinedText, index) => (
                    <button
                      key={index}
                      onClick={() => setText(predefinedText)}
                      className="text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors text-sm"
                    >
                      {predefinedText}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ações rápidas:
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setText("")}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    🗑️ Limpar
                  </button>
                  <button
                    onClick={() =>
                      setText(
                        "Demonstração da acessibilidade digital através da Língua Brasileira de Sinais."
                      )
                    }
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                  >
                    📝 Texto exemplo
                  </button>
                </div>
              </div>

              {/* Character count */}
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {text.length} caracteres
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            📚 Sobre a Biblioteca
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Esta é uma demonstração da biblioteca{" "}
            <strong>vlibras-player-nextjs v2.1.1</strong>, uma solução moderna
            para integração do VLibras em aplicações Next.js e React.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.npmjs.com/package/vlibras-player-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              📦 NPM Package
            </a>
            <a
              href="https://github.com/Luca-Sousa/vlibras-player-web-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              💻 GitHub
            </a>
            <a
              href="/hook"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ⚛️ Hook useVLibrasPlayer
            </a>
            <a
              href="/advanced"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🚀 Exemplo Avançado
            </a>
            <a
              href="/direct"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔧 Uso Direto
            </a>
            <a
              href="https://www.vlibras.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🤟 VLibras
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
