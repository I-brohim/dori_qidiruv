'use client';

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';

interface Medicine {
  id: string;
  brandName?: string;
  activeIngredient?: string;
  manufacturer?: string;
  packaging?: string;
  registrationNumber: string;
  currency?: string;
  basePrice?: string;
  wholesalePrice?: string;
  retailPrice?: string;
  dispensingCondition: string;
  // Fields from no-prescription list
  dosageForm?: string;
  pharmacotherapyGroup?: string;
  prescriptionRequired?: boolean;
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'with' | 'without'>('without');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Load both medicine lists
    Promise.all([
      fetch('/medicines.json').then(res => res.json()),
      fetch('/medicines-no-prescription.json').then(res => res.json())
    ])
      .then(([prescriptionMeds, noPrescriptionMeds]) => {
        // Combine both lists
        const combined = [...prescriptionMeds, ...noPrescriptionMeds];
        setMedicines(combined);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Dorilarni yuklashda xatolik:', error);
        setLoading(false);
      });
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on search
      // When search is made, switch to 'all' filter
      if (searchQuery.trim()) {
        setPrescriptionFilter('all');
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Transliteration map: Latin to Cyrillic (optimized)
  const latinToCyrillic = useMemo(() => {
    const map: { [key: string]: string } = {
      'shch': 'щ', 'Shch': 'Щ', 'ch': 'ч', 'Ch': 'Ч', 'sh': 'ш', 'Sh': 'Ш',
      'yo': 'ё', 'Yo': 'Ё', 'yu': 'ю', 'Yu': 'Ю', 'ya': 'я', 'Ya': 'Я',
      'ye': 'е', 'Ye': 'Е', 'ts': 'ц', 'Ts': 'Ц',
      'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'j': 'ж',
      'z': 'з', 'i': 'и', 'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о',
      'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф', 'x': 'х',
      'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д', 'E': 'Е', 'J': 'Ж',
      'Z': 'З', 'I': 'И', 'Y': 'Й', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н', 'O': 'О',
      'P': 'П', 'R': 'Р', 'S': 'С', 'T': 'Т', 'U': 'У', 'F': 'Ф', 'X': 'Х'
    };
    
    return (text: string): string => {
      let result = text;
      const patterns = Object.keys(map).sort((a, b) => b.length - a.length);
      for (const pattern of patterns) {
        result = result.replace(new RegExp(pattern, 'g'), map[pattern]);
      }
      return result;
    };
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(medicines, {
        keys: [
          'brandName', 
          'activeIngredient', 
          'manufacturer',
          'dosageForm',
          'pharmacotherapyGroup'
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [medicines]
  );

  const filteredMedicines = useMemo(() => {
    let results = medicines;
    
    // Apply search filter
    if (debouncedQuery.trim()) {
      const transliteratedQuery = latinToCyrillic(debouncedQuery);
      const searchTerm = transliteratedQuery !== debouncedQuery ? transliteratedQuery : debouncedQuery;
      results = fuse.search(searchTerm).map((result) => result.item);
    }
    
    // Apply prescription filter
    if (prescriptionFilter !== 'all') {
      results = results.filter((medicine) => {
        const requiresPrescription = medicine.dispensingCondition === 'По рецепту' || medicine.prescriptionRequired === true;
        return prescriptionFilter === 'with' ? requiresPrescription : !requiresPrescription;
      });
    }
    
    return results;
  }, [debouncedQuery, prescriptionFilter, medicines, fuse, latinToCyrillic]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const paginatedMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMedicines.slice(startIndex, endIndex);
  }, [filteredMedicines, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-600">
                {t('header.search')}
              </h1>
              <p className="text-sm text-black mt-1">
                {medicines.length.toLocaleString()} {t('header.medicines_available')}
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
                  className="text-sm font-semibold text-green-600"
                >
                  {t('header.search')}
                </Link>
                <Link 
                  href="/sources"
                  className="text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
                >
                  {t('header.sources')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Last Updated Tag */}
      <div className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-green-100 text-green-700 rounded-full border border-green-300 shadow-sm">
              {t('header.last_updated')}
            </span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 md:py-4 pl-12 text-base md:text-lg rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 bg-white text-black"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <p className="text-sm text-black mt-2">
              {filteredMedicines.length} {t('search.results_found')}
            </p>
          )}
          
          {/* Prescription Filter */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => { setPrescriptionFilter('without'); setCurrentPage(1); }}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                prescriptionFilter === 'without'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {t('filter.no_prescription')}
            </button>
            <button
              onClick={() => { setPrescriptionFilter('with'); setCurrentPage(1); }}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                prescriptionFilter === 'with'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {t('filter.with_prescription')}
            </button>
            <button
              onClick={() => { setPrescriptionFilter('all'); setCurrentPage(1); }}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                prescriptionFilter === 'all'
                  ? 'bg-gray-600 text-white border-gray-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {t('filter.all')}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-black">{t('search.loading')}</p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div className="grid gap-4 md:gap-6">
            {filteredMedicines.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  {searchQuery ? t('search.no_results') : t('search.start_search')}
                </p>
              </div>
            ) : (
              paginatedMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 md:p-6 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4">
                    <div className="flex-1">
                      <h2 className="text-base md:text-xl font-bold text-black mb-1 md:mb-2">
                        {medicine.brandName}
                      </h2>
                      <div className="space-y-1 text-sm md:text-base">
                        {medicine.dosageForm && (
                          <p className="text-black text-sm md:text-base">
                            <span className="font-semibold">{t('medicine.dosage_form')}</span> {medicine.dosageForm}
                          </p>
                        )}
                        {medicine.activeIngredient && (
                          <p className="text-black hidden md:block">
                            <span className="font-semibold">{t('medicine.active_ingredient')}</span> {medicine.activeIngredient}
                          </p>
                        )}
                        <p className="text-black text-sm md:text-base hidden md:block">
                          <span className="font-semibold">{t('medicine.manufacturer')}</span> {medicine.manufacturer}
                        </p>
                        {medicine.packaging && (
                          <p className="text-gray-600 text-xs md:text-sm hidden md:block">
                            {medicine.packaging}
                          </p>
                        )}
                        {medicine.pharmacotherapyGroup && (
                          <p className="text-gray-600 text-sm hidden md:block">
                            <span className="font-semibold">{t('medicine.group')}</span> {medicine.pharmacotherapyGroup}
                          </p>
                        )}
                      </div>
                      
                      {/* Mobile: Prescription badge */}
                      <div className="mt-2 md:hidden">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            medicine.dispensingCondition === 'По рецепту' || medicine.prescriptionRequired === true
                              ? 'bg-red-100 text-red-800 border border-red-300'
                              : 'bg-green-100 text-green-800 border border-green-300'
                          }`}
                        >
                          {medicine.dispensingCondition === 'По рецепту' || medicine.prescriptionRequired === true 
                            ? t('medicine.prescription_required')
                            : t('medicine.no_prescription')}
                        </span>
                      </div>
                    </div>

                    {/* Desktop: Badge only */}
                    <div className="hidden md:flex flex-shrink-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          medicine.dispensingCondition === 'По рецепту' || medicine.prescriptionRequired === true
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-green-100 text-green-800 border border-green-300'
                        }`}
                      >
                        {medicine.dispensingCondition === 'По рецепту' || medicine.prescriptionRequired === true 
                          ? t('medicine.prescription_required')
                          : t('medicine.no_prescription')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredMedicines.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ←
            </button>
            
            <div className="flex gap-1 items-center">
              {(() => {
                const pages = [];
                
                if (totalPages <= 7) {
                  // Show all pages if 7 or fewer
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // Always show first page
                  pages.push(1);
                  
                  if (currentPage <= 3) {
                    // Near start: show 1, 2, 3, 4, ..., last
                    pages.push(2, 3, 4);
                    pages.push('ellipsis-end');
                    pages.push(totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    // Near end: show 1, ..., last-3, last-2, last-1, last
                    pages.push('ellipsis-start');
                    pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                  } else {
                    // Middle: show 1, ..., current-1, current, current+1, ..., last
                    pages.push('ellipsis-start');
                    pages.push(currentPage - 1, currentPage, currentPage + 1);
                    pages.push('ellipsis-end');
                    pages.push(totalPages);
                  }
                }
                
                return pages.map((page, idx) => {
                  if (typeof page === 'string') {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                });
              })()}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t-2 border-green-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <Link 
            href="/sources" 
            className="text-green-600 hover:text-green-700 font-semibold inline-block mb-3"
          >
            {t('footer.sources_link')}
          </Link>
          <p className="text-gray-500 text-xs">Mehr bilan, Ibrohim Iskandarov</p>
        </div>
      </footer>
    </div>
  );
}
