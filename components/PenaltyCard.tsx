import Link from 'next/link';
import { ForumTopic } from '@/types';

interface PenaltyCardProps {
  item: ForumTopic;
}

const verdictConfig = {
  can_dispute: { label: 'Реально оспорить', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  hard_case: { label: 'Сложный случай', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  useless: { label: 'Штраф по делу / Без шансов', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
  needs_advice: { label: 'Ищет совета сообщества', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const roleLabels = {
  seller: 'Селлер',
  pvz: 'Владелец ПВЗ',
  warehouse: 'Склад',
  job_worker: 'Ozon / WB Job',
  courier_darkstore: 'Курьер / Даркстор',
};

export default function PenaltyCard({ item }: PenaltyCardProps) {
  const verdict = verdictConfig[item.verdict];
  const isWB = item.marketplace === 'wb';

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-slate-300">
      <div>
        {/* Автор, дата и тег площадки */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[11px] ${
                isWB ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isWB ? 'Wildberries' : 'Ozon'}
            </span>
            <span className="text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded text-[11px]">
              {roleLabels[item.role]}
            </span>
          </div>

          <span className="text-slate-400 text-[11px] font-mono">
            {item.date}
          </span>
        </div>

        {/* Автор поста */}
        <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
          <span>{item.authorTag}</span>
          {item.hasProofImage && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
              📸 есть скриншот
            </span>
          )}
        </div>

        {/* Тема / заголовок со ссылкой на пост */}
        <Link href={`/case/${item.slug}`} className="hover:underline">
          <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
            {item.title}
          </h3>
        </Link>

        {/* Описание из предложки */}
        <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
          «{item.situation}»
        </p>

        {/* Самый полезный совет из комментов */}
        {item.topAdvicePreview && (
          <div className="mt-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-700">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-0.5">
              💡 Топ-совет из ветки:
            </div>
            <p className="line-clamp-2 italic text-[11px] text-slate-600">
              {item.topAdvicePreview}
            </p>
          </div>
        )}
      </div>

      {/* Нижняя плашка: сумма, вердикт и счетчик комментов */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-slate-400">Сумма удержания</div>
            <div className="text-base font-bold text-rose-600">
              -{item.penaltyAmount.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          <span className={`text-[11px] font-semibold px-2 py-1 rounded border ${verdict.bg}`}>
            {verdict.label}
          </span>
        </div>

        {/* Народные реакции и ссылка на ветку обсуждения */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span title="Считают штраф несправедливым" className="flex items-center gap-1 hover:text-rose-600 cursor-pointer">
              🔥 {item.upvotesUnfair}
            </span>
            <span title="Считают, что штраф по делу" className="flex items-center gap-1 hover:text-slate-700 cursor-pointer">
              ⚖️ {item.upvotesFair}
            </span>
          </div>

          <Link
            href={`/case/${item.slug}`}
            className="text-xs font-semibold bg-slate-900 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>💬 Обсудить</span>
            <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px]">
              {item.answersCount}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}