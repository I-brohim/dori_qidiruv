'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'uz' | 'ru';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Header
  'header.search': { uz: 'Doritopdim', ru: 'Doritopdim' },
  'header.sources': { uz: 'Manbalar', ru: 'Источники' },
  'header.medicines_available': { uz: 'ta dori mavjud', ru: 'лекарств доступно' },
  'header.sources_title': { uz: 'Manbalar', ru: 'Источники' },
  'header.sources_subtitle': { uz: "Ma'lumot manbalari", ru: 'Источники информации' },
  'header.last_updated': { uz: "oxirgi yangilanish: 12.12.2025da", ru: 'обновлено: 12.12.2025' },
  
  // Search
  'search.placeholder': { 
    uz: 'Dori nomi, faol modda yoki ishlab chiqaruvchini kiriting...', 
    ru: 'Введите название лекарства, активное вещество или производителя...' 
  },
  'search.results_found': { uz: 'ta natija topildi', ru: 'результатов найдено' },
  'search.no_results': { uz: 'Hech narsa topilmadi', ru: 'Ничего не найдено' },
  'search.start_search': { uz: 'Qidiruvni boshlang', ru: 'Начните поиск' },
  'search.loading': { uz: 'Yuklanmoqda...', ru: 'Загрузка...' },
  
  // Filters
  'filter.no_prescription': { uz: 'Retseptsiz', ru: 'Без рецепта' },
  'filter.with_prescription': { uz: 'Retsept bilan', ru: 'По рецепту' },
  'filter.all': { uz: 'Hammasi', ru: 'Все' },
  
  // Medicine card
  'medicine.dosage_form': { uz: 'Dori shakli:', ru: 'Форма выпуска:' },
  'medicine.active_ingredient': { uz: 'Faol modda:', ru: 'Активное вещество:' },
  'medicine.manufacturer': { uz: 'Ishlab chiqaruvchi:', ru: 'Производитель:' },
  'medicine.group': { uz: 'Guruh:', ru: 'Группа:' },
  'medicine.prescription_required': { uz: 'Retsept bilan', ru: 'По рецепту' },
  'medicine.no_prescription': { uz: 'Retseptsiz', ru: 'Без рецепта' },
  
  // Footer
  'footer.medicines_list': { uz: "Dorilar ro'yxati", ru: 'Список лекарств' },
  'footer.sources_link': { uz: 'Manbalar →', ru: 'Источники →' },
  
  // Sources page
  'sources.title1': { uz: 'Retseptsiz beriladigan dori vositalari', ru: 'Лекарства, отпускаемые без рецепта' },
  'sources.telegram_view': { uz: "Telegram kanalida ko'rish", ru: 'Посмотреть в Telegram канале' },
  'sources.title2': { uz: "Cheklangan narxlar ro'yxati", ru: 'Список предельных цен' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
