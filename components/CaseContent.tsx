'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ForumTopic } from '@/types';

interface CaseContentProps {
  topic: ForumTopic;
}

const verdictConfig = {
  can_dispute: { label: 'Реально оспорить', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  hard_case: { label: 'Сложный случай', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  useless: { label: 'Штраф по делу / Без шансов', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
  needs_advice: { label: 'Ищет совета сообщества', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const roleLabels = {
  seller: 'Селлер (B2B)',
  pvz: 'Владелец ПВЗ',
  warehouse: 'Склад',
  job_worker: 'Ozon / WB Job',
  courier_darkstore: 'Курьер / Даркстор',
};

export default function CaseContent({ topic }: CaseContentProps) {
  const [votes, setVotes] = useState({ unfair: topic.upvotesUnfair, fair: topic.upvotesFair });
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState<string[]>([
    topic.topAdvicePreview || 'Главное — сразу запросить логи и детализацию выгрузки в личном кабинете.',
    'Подавайте обращение через раздел досудебного урегулирования, боты первой линии поддержки такие вопросы обычно не решают.',
  ]);
  const [newComment, setNewComment] = useState('');

  const handleVote = (type: 'unfair' | 'fair') => {
    if (hasVoted) return;
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setHasVoted(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, newComment.trim()]);
    setNewComment('');
  };

  const isWB = topic.marketplace === 'wb';
  const verdict = verdictConfig[topic.verdict];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        {/* Верхняя навигация */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <span>←</span>
              <span>Ко всем штрафам</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded">ШТРАФАМ.NET</span>
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Форум взаимопомощи</span>
            </div>
          </div>
        </header>

        {/* Тело кейса */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            {/* Теги метаданных */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[11px] ${
                    isWB ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {isWB ? 'Wildberries' : 'Ozon'}
                </span>
                <span className="text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  {roleLabels[topic.role]}
                </span>
                <span className="text-slate-400 text-xs">• Автор: {topic.authorTag}</span>
              </div>
              <span className="text-slate-400 text-xs font-mono">{topic.date}</span>
            </div>

            {/* H1 Заголовок */}
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
              {topic.title}
            </h1>

            {/* Блок суммы */}
            <div className="inline-flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-lg mb-6">
              <span className="text-xs text-rose-600 font-medium">Сумма списания / штрафа:</span>
              <span className="text-xl font-bold text-rose-700">
                -{topic.penaltyAmount.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            {/* Описание сути проблемы */}
            <div className="mb-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Суть ситуации
              </h2>
              <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                {topic.situation}
              </div>
            </div>

            {/* Блок народного вердикта и голосования */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Оценка сообщества:</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${verdict.bg}`}>
                  {verdict.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote('unfair')}
                  disabled={hasVoted}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    hasVoted
                      ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  🔥 Беспредел площадки ({votes.unfair})
                </button>
                <button
                  onClick={() => handleVote('fair')}
                  disabled={hasVoted}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    hasVoted
                      ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  ⚖️ По делу ({votes.fair})
                </button>
              </div>
            </div>
          </article>

          {/* Ветка комментариев */}
          <section className="mt-8">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>Обсуждение и советы коллег</span>
              <span className="text-xs font-normal text-slate-400">({comments.length})</span>
            </h2>

            <div className="space-y-3 mb-6">
              {comments.map((text, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="font-semibold text-slate-700">Участник #{idx + 1}</span>
                    {idx === 0 && (
                      <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-[10px]">
                        💡 Самый полезный ответ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Форма добавления ответа */}
            <form onSubmit={handleAddComment} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Добавить совет или свой прецедент
              </label>
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Расскажите, сталкивались ли с этим, какой регламент сработал и что писали в тикет..."
                className="w-full text-xs p-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all resize-none mb-3 bg-slate-50"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-xs font-bold bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Опубликовать ответ
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-400">
        ШТРАФАМ.NET — Независимое сообщество взаимной поддержки участников e-commerce
      </footer>
    </div>
  );
}