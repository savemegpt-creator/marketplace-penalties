import { PenaltyCase } from '@/types';

interface PenaltyCardProps {
  item: PenaltyCase;
}

const statusConfig = {
  resolved_full: { label: 'Успешно оспорено', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  resolved_partial: { label: 'Частичный возврат', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  in_progress: { label: 'В процессе оспаривания', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  rejected: { label: 'Отклонено', color: 'bg-rose-50 text-rose-700 border-rose-200' },
};

const roleLabels = {
  seller: 'Селлер (B2B)',
  pvz: 'Владелец ПВЗ',
  warehouse: 'Склад',
  job_worker: 'Ozon / WB Job',
  courier_darkstore: 'Курьер / Даркстор',
};

export default function PenaltyCard({ item }: PenaltyCardProps) {
  const status = statusConfig[item.status];
  const isWB = item.marketplace === 'wb';

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      <div>
        {/* Верхняя строка тегов */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                isWB ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isWB ? 'Wildberries' : 'Ozon'}
            </span>
            <span className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded">
              {roleLabels[item.role]}
            </span>
          </div>

          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Заголовок кейса */}
        <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
          {item.title}
        </h3>

        {/* Краткое описание */}
        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Нормативная база */}
        <div className="mt-3 space-y-1">
          <div className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
            Регламент: {item.clause}
          </div>
          {item.lawReference && (
            <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50/70 px-2.5 py-1 rounded border border-emerald-100">
              Закон: {item.lawReference}
            </div>
          )}
        </div>
      </div>

      {/* Нижняя часть с суммами и кнопками */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] text-slate-400">Сумма удержания</div>
            <div className="text-base font-bold text-slate-900">
              {item.penaltyAmount.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          {item.recoveredAmount ? (
            <div className="text-right">
              <div className="text-[11px] text-emerald-600 font-medium">Возвращено</div>
              <div className="text-base font-bold text-emerald-600">
                +{item.recoveredAmount.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          ) : null}
        </div>

        {/* Кнопки действий */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
          <button
            onClick={() => alert('Формирование шаблона претензии по ФЗ № 289-ФЗ...')}
            className="flex-1 text-center text-xs font-semibold bg-slate-900 text-white py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Скачать шаблон претензии
          </button>
          <button
            onClick={() => alert('Форма официального ответа по ст. 152 ГК РФ')}
            title="Официальный ответ представителя площадки (ч. 3 ст. 152 ГК РФ)"
            className="text-[11px] text-slate-400 hover:text-slate-600 px-2 py-2 border border-slate-200 rounded-lg transition-colors"
          >
            ст. 152 ГК
          </button>
        </div>
      </div>
    </article>
  );
}