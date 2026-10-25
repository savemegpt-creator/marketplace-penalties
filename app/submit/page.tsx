'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubmitCasePage() {
  const [platform, setPlatform] = useState<'wb' | 'ozon'>('wb');
  const [role, setRole] = useState('seller');
  const [penaltyAmount, setPenaltyAmount] = useState('');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [contact, setContact] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Формируем объект новой истории
      const newSubmission = {
        id: Date.now().toString(),
        platform,
        role,
        title,
        penalty_amount: penaltyAmount ? Number(penaltyAmount) : null,
        story,
        contact: contact || null,
        created_at: new Date().toISOString(),
        status: 'pending',
      };

      // Достаем существующие истории из localStorage или создаем пустой массив
      const existingSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      
      // Добавляем новую историю в начало списка
      localStorage.setItem('submissions', JSON.stringify([newSubmission, ...existingSubmissions]));

      // Имитируем небольшую задержку для плавности интерфейса
      await new Promise((resolve) => setTimeout(resolve, 400));

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Ошибка:', err);
      setErrorMessage('Не удалось сохранить историю локально.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        {/* Шапка */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <span>←</span>
              <span>Назад на форум</span>
            </Link>
            <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded">
              ШТРАФАМ.NET
            </span>
          </div>
        </header>

        {/* Основной блок */}
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  ✓
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  Штраф успешно отправлен в предложку
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  История сохранена в локальной памяти браузера. После модерации она отобразится на главной странице.
                </p>
                <Link
                  href="/"
                  className="inline-block text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg transition-colors"
                >
                  Вернуться ко всем обсуждениям
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-xl font-bold text-slate-900 mb-1">
                    Предложить штраф на разбор
                  </h1>
                  <p className="text-xs text-slate-500">
                    Анонимно или с контактом. Коллеги по площадке подскажут, реально ли отбить удержание и что отвечать поддержке.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Выбор маркетплейса */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Площадка
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPlatform('wb')}
                        className={`py-2.5 px-4 rounded-lg border text-xs font-semibold transition-all ${
                          platform === 'wb'
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        Wildberries
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlatform('ozon')}
                        className={`py-2.5 px-4 rounded-lg border text-xs font-semibold transition-all ${
                          platform === 'ozon'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        Ozon
                      </button>
                    </div>
                  </div>

                  {/* Роль */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Ваша категория / роль
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                    >
                      <option value="seller">Селлер (FBO / FBS)</option>
                      <option value="job_worker">Работник склада (Ozon Job / WB Склад)</option>
                      <option value="pvz">Владелец или сотрудник ПВЗ</option>
                      <option value="courier_darkstore">Курьер / Даркстор</option>
                      <option value="warehouse">Складской подрядчик</option>
                    </select>
                  </div>

                  {/* Сумма удержания */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Сумма списания (₽)
                    </label>
                    <input
                      type="number"
                      placeholder="Например: 45000"
                      value={penaltyAmount}
                      onChange={(e) => setPenaltyAmount(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                    />
                  </div>

                  {/* Краткая тема */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Краткая суть проблемы (Заголовок)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например: Завысили замеры на Коледино по FBS в 3 раза"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                    />
                  </div>

                  {/* Подробное описание */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Подробности ситуации
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Когда произошло списание, какой склад или смена, что ответила поддержка маркетплейса..."
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 resize-none"
                    />
                  </div>

                  {/* Контакт */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telegram для связи <span className="text-slate-400 font-normal">(необязательно)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="@username"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                    />
                  </div>

                  {/* Кнопка отправки */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg transition-colors shadow-xs"
                    >
                      {isLoading ? 'Сохранение...' : 'Отправить на публикацию'}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Данные сохраняются локально на вашем устройстве
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-400">
        ШТРАФАМ.NET — Независимое сообщество взаимопомощи
      </footer>
    </div>
  );
}