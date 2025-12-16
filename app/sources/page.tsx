'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Sources() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-600">
                {t('header.sources_title')}
              </h1>
              <p className="text-sm text-black mt-1">
                {t('header.sources_subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4 justify-end">
              {/* Language Switcher */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                    language === 'uz'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                    language === 'ru'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  RU
                </button>
              </div>
              <div className="flex gap-3 items-center">
                <Link 
                  href="/"
                  className="text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
                >
                  {t('header.search')}
                </Link>
                <Link 
                  href="/sources"
                  className="text-sm font-semibold text-green-600"
                >
                  {t('header.sources')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Service Update Message */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-yellow-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                {t('update.title')}
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                {t('update.message')}
              </p>
              <a
                href={language === 'uz' 
                  ? 'https://telegra.ph/EHlektron-recept-tizimini-zhorij-ehtish-masalalari-mu%D2%B3okama-%D2%9Bilindi-12-14'
                  : 'https://telegra.ph/Obsuzhdeny-voprosy-vnedreniya-sistemy-EHlektronnyj-recept-12-14'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                {t('update.read_more')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t-2 border-green-200">
        <div className="container mx-auto px-4 text-center text-sm text-black">
          <p>{language === 'uz' ? 'Dorilar qidiruvi' : 'Поиск лекарств'} - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
