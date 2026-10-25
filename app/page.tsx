'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_TOPICS } from '@/data/penalties';
import { Marketplace, UserRole } from '@/types';
import PenaltyCard from '@/components/PenaltyCard';

export default function Home() {
  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace>('all');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    return MOCK_TOPICS.filter((item) => {
      const matchMarketplace =
        selectedMarketplace === 'all' || item.marketplace === selectedMarketplace;
      const matchRole = selectedRole === 'all' || item.role === selectedRole;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authorTag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchMarketplace && matchRole && matchQuery;
    });
  }, [selectedMarketplace, selectedRole, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        {/* Информационная плашка */}
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800">
          <span>Народная база штрафов и взаимопомощи селлеров, работников складов и владельцев ПВЗ. Делитесь опытом и решениями без цензуры.</span>
        </div>

        {/* Шапка портала */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded">ШТРАФАМ.NET</span>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  База штрафов и форум взаимопомощи
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Реальные истории удержаний WB & Ozon: опыт коллег, советы и способы вернуть деньги
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Поиск по складу, теме или сумме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 w-full md:w-64 outline-none focus:border-blue-500 focus:bg-white transition-all"
              />

              {/* Кнопка предложки постов, ведущая на страницу /submit */}
              <Link
                href="/submit"
                className="whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>+ Предложить штраф</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Основная часть форума */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Фильтры по площадкам и ролям */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            {/* Площадки */}
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

            {/* Роли */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {[
                { id: 'all', label: 'Все темы' },
                { id: 'seller', label: 'Селлеры' },
                { id: 'job_worker', label: 'Работники складов (Job)' },
                { id: 'pvz', label: 'Владельцы ПВЗ' },
                { id: 'courier_darkstore', label: 'Курьеры / Дарксторы' },
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

          {/* Сетка обсуждений */}
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTopics.map((item) => (
                <PenaltyCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-xs">Пока таких штрафов не предлагали. Будьте первыми!</p>
            </div>
          )}
        </main>
      </div>

      {/* Подвал сообщества */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6 px-4 text-slate-500 text-xs text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 ШТРАФАМ.NET — Независимое сообщество взаимопомощи на маркетплейсах</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-600 cursor-pointer">Правила публикации</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Бот предложки в TG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}