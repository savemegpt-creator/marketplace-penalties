'use client';

import { useState, useMemo } from 'react';
import { MOCK_PENALTIES } from '@/data/penalties';
import { Marketplace, UserRole } from '@/types';
import PenaltyCard from '@/components/PenaltyCard';

export default function Home() {
  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace>('all');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = useMemo(() => {
    return MOCK_PENALTIES.filter((item) => {
      const matchMarketplace =
        selectedMarketplace === 'all' || item.marketplace === selectedMarketplace;
      const matchRole = selectedRole === 'all' || item.role === selectedRole;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clause.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.lawReference && item.lawReference.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchMarketplace && matchRole && matchQuery;
    });
  }, [selectedMarketplace, selectedRole, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        {/* Юридическая верхняя плашка (Header Disclaimer) */}
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800">
          <span className="font-semibold text-white">Информационное уведомление:</span> Независимый правовой реестр. Портал не является официальным ресурсом или аффилированным лицом ООО «РВБ» (Wildberries) или ООО «Интернет Решения» (Ozon).
        </div>

        {/* Шапка портала */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-black text-xs px-2 py-0.5 rounded">MP-ARBITR</span>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  Реестр оспаривания штрафов маркетплейсов
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Практика применения ФЗ № 289-ФЗ, ст. 14.69 / 14.70 КоАП РФ и регламентов платформ (2026–2027)
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Поиск по пункту оферты, закону или теме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 w-full md:w-80 outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Фильтры */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            {/* Переключатель маркетплейсов */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl w-fit">
              <button
                onClick={() => setSelectedMarketplace('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedMarketplace === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Все площадки
              </button>
              <button
                onClick={() => setSelectedMarketplace('wb')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedMarketplace === 'wb' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Wildberries
              </button>
              <button
                onClick={() => setSelectedMarketplace('ozon')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedMarketplace === 'ozon' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ozon
              </button>
            </div>

            {/* Фильтр по реальным ролям из исследования */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {[
                { id: 'all', label: 'Все категории' },
                { id: 'seller', label: 'Селлеры' },
                { id: 'pvz', label: 'Владельцы ПВЗ' },
                { id: 'job_worker', label: 'Ozon / WB Job' },
                { id: 'courier_darkstore', label: 'Курьеры / Дарксторы' },
                { id: 'warehouse', label: 'Склад FBO/FBS' },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as UserRole | 'all')}
                  className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-lg border transition-all ${
                    selectedRole === role.id
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Сетка карточек */}
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCases.map((item) => (
                <PenaltyCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-xs">По заданным фильтрам кейсов не найдено.</p>
            </div>
          )}
        </main>
      </div>

      {/* Юридический подвал (Footer Disclaimer по ст. 1253.1 ГК РФ) */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-8 px-4 text-slate-500 text-[11px] leading-relaxed">
        <div className="max-w-6xl mx-auto">
          <p className="font-semibold text-slate-700 mb-1">
            Правовой статус ресурса и отказ от аффилированности (ст. 1253.1 ГК РФ):
          </p>
          <p>
            Портал является независимым информационно-аналитическим агрегатором и выполняет функции информационного посредника. Администрация сайта не связана договорными, партнерскими или корпоративными обязательствами с ООО «РВБ», ООО «Вайлдберриз» и ООО «Интернет Решения». Словесные обозначения «Wildberries», «WB», «Ozon» и «Озон» используются исключительно в информационных и описательных целях в соответствии с п. 157 Постановления Пленума Верховного Суда РФ № 10 и не индивидуализируют услуги портала. Исключительные права на товарные знаки принадлежат их правообладателям.
          </p>
        </div>
      </footer>
    </div>
  );
}