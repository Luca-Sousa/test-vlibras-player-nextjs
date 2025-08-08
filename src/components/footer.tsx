"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="mt-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        📚 Sobre a Biblioteca
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Esta é uma demonstração da biblioteca{" "}
        <strong>vlibras-player-nextjs v2.5.1</strong>, uma solução moderna para
        integração do VLibras em aplicações Next.js e React.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex justify-center gap-4 flex-wrap">
          {pathname === "/" && (
            <>
              <Link
                href="/hook"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ⚛️ Hook useVLibrasPlayer
              </Link>
              <Link
                href="/advanced"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🚀 Exemplo Avançado
              </Link>
            </>
          )}

          {pathname === "/hook" && (
            <>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🏠 Página Inicial
              </Link>
              <Link
                href="/advanced"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🚀 Exemplo Avançado
              </Link>
            </>
          )}

          {pathname === "/advanced" && (
            <>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🏠 Página Inicial
              </Link>
              <Link
                href="/hook"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ⚛️ Hook useVLibrasPlayer
              </Link>
            </>
          )}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="https://www.npmjs.com/package/vlibras-player-nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            📦 NPM Package
          </Link>
          <Link
            href="https://www.vlibras.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🤟 VLibras
          </Link>
          <Link
            href="https://github.com/Luca-Sousa/vlibras-player-web-nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            💻 GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
