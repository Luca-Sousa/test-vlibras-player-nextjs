"use client";

import React, { useRef, useState, useCallback } from "react";
import { useVLibrasPlayer } from "vlibras-player-nextjs";
import Footer from "../components/footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(
    "Olá! Bem-vindo ao teste do VLibras Player NextJS."
  );
  const [currentStatus, setCurrentStatus] = useState<string>("Não iniciado");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Callbacks otimizados para performance
  const handleOnLoad = useCallback(() => {
    setIsPlayerReady(true);
    setCurrentStatus("Pronto");
  }, []);

  const handleOnTranslationStart = useCallback(() => {
    setIsTranslating(true);
    setCurrentStatus("Traduzindo...");
  }, []);

  const handleOnTranslationEnd = useCallback(() => {
    setIsTranslating(false);
    setCurrentStatus("Tradução concluída");
  }, []);

  const handleOnTranslationError = useCallback(() => {
    setIsTranslating(false);
    setCurrentStatus("Erro na tradução");
  }, []);

  const handleOnPlay = useCallback(() => {
    setIsCurrentlyPlaying(true);
    setIsPaused(false);
    setCurrentStatus("Reproduzindo...");
  }, []);

  const handleOnPause = useCallback(() => {
    setIsCurrentlyPlaying(false);
    setIsPaused(true);
    setCurrentStatus("Pausado");
  }, []);

  const handleOnResume = useCallback(() => {
    setIsCurrentlyPlaying(true);
    setIsPaused(false);
    setCurrentStatus("Reproduzindo...");
  }, []);

  const handleOnStop = useCallback(() => {
    setIsCurrentlyPlaying(false);
    setIsPaused(false);
    setCurrentStatus("Parado");
  }, []);

  const handleOnRestart = useCallback(() => {
    setIsCurrentlyPlaying(true);
    setIsPaused(false);
    setCurrentStatus("Reiniciando...");
  }, []);

  const {
    isLoading,
    error,
    isReady,
    translate,
    pause,
    resume,
    stop,
    restart,
  } = useVLibrasPlayer({
    autoInit: true,
    containerRef: containerRef as React.RefObject<HTMLElement>,
    // Configurações profissionais
    targetPath: "/vlibras/target",
    region: "BR",
    enableStats: true,
    // Callbacks para controle de estado
    onLoad: handleOnLoad,
    onTranslationStart: handleOnTranslationStart,
    onTranslationEnd: handleOnTranslationEnd,
    onTranslationError: handleOnTranslationError,
    onPlay: handleOnPlay,
    onPause: handleOnPause,
    onResume: handleOnResume,
    onStop: handleOnStop,
    onRestart: handleOnRestart,
  });

  // Função para pré-processar texto e remover pontuações problemáticas
  const preprocessText = (text: string): string => {
    return text
      // Remove pontuações que ficam grudadas nas palavras
      .replace(/[.,!?;:()[\]{}""''`´]/g, ' ')
      // Remove caracteres especiais problemáticos
      .replace(/[^\w\sáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]/g, ' ')
      // Substitui múltiplos espaços por um único espaço
      .replace(/\s+/g, ' ')
      // Remove espaços no início e fim
      .trim();
  };

  const handleTranslate = async () => {
    if (!text.trim() || !isReady) return;

    // Pré-processa o texto antes de enviar para o VLibras
    const processedText = preprocessText(text);
    
    try {
      await translate(processedText);
    } catch (error) {
      console.error("Erro na tradução:", error);
    }
  };

  const predefinedTexts = [
    "Olá! Como você está?",
    "Bem-vindos ao VLibras Player NextJS!",
    "Esta é uma demonstração da biblioteca de tradução para Libras.",
    "A acessibilidade é fundamental para uma web inclusiva.",
    "Obrigado por testar nossa biblioteca!",
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
              Versão: 2.5.1
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
                        : isPlayerReady
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {isLoading 
                      ? "Carregando" 
                      : error 
                      ? "Erro" 
                      : currentStatus}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    Versão:
                  </span>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">
                    v2.5.1 (Hooks)
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
                disabled={isTranslating || !text.trim() || isLoading || !isReady || isCurrentlyPlaying || isPaused}
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
                onClick={() => pause()}
                disabled={!isReady || !isCurrentlyPlaying || isPaused}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                title="Pausar reprodução"
              >
                ⏸️ Pausar
              </button>

              <button
                onClick={() => resume()}
                disabled={!isReady || !isPaused}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                title="Continuar reprodução"
              >
                ▶️ Continuar
              </button>

              <button
                onClick={() => restart()}
                disabled={!isReady || (!isCurrentlyPlaying && !isPaused)}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                title="Reiniciar animação"
              >
                🔄 Reiniciar
              </button>

              <button
                onClick={() => stop()}
                disabled={!isReady || (!isCurrentlyPlaying && !isPaused)}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                title="Parar reprodução"
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
        <Footer />
      </div>
    </div>
  );
}
