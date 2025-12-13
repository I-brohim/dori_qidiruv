'use client';

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';

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
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'with' | 'without'>('without');
  const [loading, setLoading] = useState(true);

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
    
    return results.slice(0, 50);
  }, [debouncedQuery, prescriptionFilter, medicines, fuse, latinToCyrillic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-600">
                Qidiruv
              </h1>
              <p className="text-sm text-black mt-1">
                {medicines.length.toLocaleString()} ta dori mavjud
              </p>
            </div>
            <div className="flex items-center gap-4 justify-end">
              <div className="flex gap-3 items-center">
                <Link 
                  href="/"
                  className="text-sm font-semibold text-green-600"
                >
                  Qidiruv
                </Link>
                <Link 
                  href="/sources"
                  className="text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
                >
                  Manbalar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Dori nomi, faol modda yoki ishlab chiqaruvchini kiriting..."
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
              {filteredMedicines.length} ta natija topildi
            </p>
          )}
          
          {/* Prescription Filter */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setPrescriptionFilter('without')}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                prescriptionFilter === 'without'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Retseptsiz
            </button>
            <button
              onClick={() => setPrescriptionFilter('with')}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                prescriptionFilter === 'with'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Retsept bilan
            </button>
            <button
              onClick={() => setPrescriptionFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                prescriptionFilter === 'all'
                  ? 'bg-gray-600 text-white border-gray-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Hammasi
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-black">Yuklanmoqda...</p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div className="grid gap-4 md:gap-6">
            {filteredMedicines.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  {searchQuery ? 'Hech narsa topilmadi' : 'Qidiruvni boshlang'}
                </p>
              </div>
            ) : (
              filteredMedicines.map((medicine) => (
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
                            <span className="font-semibold">Dori shakli:</span> {medicine.dosageForm}
                          </p>
                        )}
                        {medicine.activeIngredient && (
                          <p className="text-black hidden md:block">
                            <span className="font-semibold">Faol modda:</span> {medicine.activeIngredient}
                          </p>
                        )}
                        <p className="text-black text-sm md:text-base hidden md:block">
                          <span className="font-semibold">Ishlab chiqaruvchi:</span> {medicine.manufacturer}
                        </p>
                        {medicine.packaging && (
                          <p className="text-gray-600 text-xs md:text-sm hidden md:block">
                            {medicine.packaging}
                          </p>
                        )}
                        {medicine.pharmacotherapyGroup && (
                          <p className="text-gray-600 text-sm hidden md:block">
                            <span className="font-semibold">Guruh:</span> {medicine.pharmacotherapyGroup}
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
                            ? 'Retsept bilan' 
                            : 'Retseptsiz'}
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
                          ? 'Retsept bilan' 
                          : 'Retseptsiz'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t-2 border-green-200">
        <div className="container mx-auto px-4 text-center text-sm text-black">
          <p>Dorilar ro'yxati - {new Date().getFullYear()}</p>
          <Link 
            href="/sources" 
            className="text-green-600 hover:text-green-700 font-semibold mt-2 inline-block"
          >
            Manbalar →
          </Link>
        </div>
      </footer>
    </div>
  );
}
