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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Source 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-4">
              {t('sources.title1')}
            </h2>
            <p className="text-sm text-gray-500 italic mb-4 border-l-4 border-green-500 pl-3">
              {language === 'uz' 
                ? "Sog'liqni saqlash vazirligi matbuot xizmati"
                : "Пресс-служба министерства здравоохранения Узбекистана"}
            </p>
            <div className="prose prose-sm max-w-none">
              {language === 'uz' ? (
                <>
                  <p className="text-gray-700 mb-4">
                    ❓ Рецептсиз бериладиган дори воситалари ҳақида қаердан маълумот олса бўлади?
                  </p>
                  <p className="text-gray-700 mb-4">
                    💻 "Дори воситалари ва фармацевтика фаолияти тўғрисида"ги қонунга мувофиқ, рецептсиз бериладиган дори воситалари ҳақидаги ахборот дори воситаларининг тиббиётда қўлланилишига доир йўриқномаларда ҳамда Тиббиёт амалиётида қўлланилишига рухсат этилган дори воситалари, тиббий буюмлар ва тиббий техника давлат реестрида жойлаштириб борилади.
                  </p>
                  <p className="text-gray-700 mb-4">
                    📰 Шунингдек, бундай ахборот ОАВ ва ихтисослаштирилган босма нашрларда ҳам берилиши мумкин.
                  </p>
                  <p className="text-gray-700 mb-4">
                    👆 Ҳозирга кунда 1846 турдаги рецептсиз бериладиган дори воситалари давлат рўйхатидан ўтган бўлиб, юқоридаги жадвалда тиббиёт амалиётида энг кўп қўлланилаётганлари билан танишишингиз мумкин.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Соғлиқни сақлаш вазирлиги Матбуот хизмати
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    ❓ Где можно получить информацию о лекарствах, отпускаемых без рецепта?
                  </p>
                  <p className="text-gray-700 mb-4">
                    💻 В соответствии с Законом "О лекарственных средствах и фармацевтической деятельности", информация о лекарствах, отпускаемых без рецепта, размещается в инструкциях по медицинскому применению лекарственных средств, а также в государственном реестре лекарственных средств, медицинских изделий и медицинской техники, разрешенных к применению в медицинской практике.
                  </p>
                  <p className="text-gray-700 mb-4">
                    📰 Кроме того, такая информация может быть предоставлена в СМИ и специализированных печатных изданиях.
                  </p>
                  <p className="text-gray-700 mb-4">
                    👆 На сегодняшний день зарегистрировано 1846 видов лекарственных средств, отпускаемых без рецепта, с наиболее часто используемыми в медицинской практике вы можете ознакомиться в таблице выше.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Пресс-служба Министерства здравоохранения
                  </p>
                </>
              )}
            </div>
            <a
              href="https://t.me/ssvuz/20150"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.324-.437.892-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.122.1.155.235.171.33.016.095.036.314.02.485z"/>
              </svg>
              {t('sources.telegram_view')}
            </a>
          </div>

          {/* Source 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-4">
              {t('sources.title2')}
            </h2>
            <p className="text-sm text-gray-500 italic mb-4 border-l-4 border-green-500 pl-3">
              {language === 'uz' 
                ? 'SSV huzuridagi "Farmatsevtika mahsulotlari xavfsizligi markazi" davlat muassasasining rasmiy telegram kanali'
                : "Официальный Telegram-канал Центра по безопасности фармацевтических продуктов при Министерстве здравоохранения"}
            </p>
            <div className="prose prose-sm max-w-none">
              {language === 'uz' ? (
                <>
                  <p className="text-gray-700 mb-4">
                    👍 <strong>Cheklangan narxlar</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    Yurtimizda 2025-yil 9-dekabr holatiga ko'ra, retsept bo'yicha beriladigan 12 815 ta nom va dozirovkadagi dori vositasiga cheklangan narxlar qayd etildi.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Yangilangan cheklangan narxlar reestri bilan yuqoridagi jadvalda shuningdek, quyidagi havola orqali batafsil tanishishingiz mumkin.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    👍 <strong>Предельные цены</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    По состоянию на 9 декабря 2025 года в нашей стране зарегистрированы предельные цены на 12 815 наименования и дозировки лекарственных средств, отпускаемых по рецепту.
                  </p>
                  <p className="text-gray-700 mb-4">
                    С обновлённым реестром предельных цен можно ознакомиться в таблице выше, а также по ссылке.
                  </p>
                </>
              )}
            </div>
            <a
              href="https://t.me/uzpharmcontrol/3754"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.324-.437.892-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.122.1.155.235.171.33.016.095.036.314.02.485z"/>
              </svg>
              {t('sources.telegram_view')}
            </a>
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
