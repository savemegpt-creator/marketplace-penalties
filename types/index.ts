export type Marketplace = 'wb' | 'ozon' | 'all';

// Расширенные роли с учетом Ozon Job и дарксторов
export type UserRole = 'seller' | 'pvz' | 'warehouse' | 'job_worker' | 'courier_darkstore';

export type DisputeStatus = 'resolved_full' | 'resolved_partial' | 'in_progress' | 'rejected';

export interface PenaltyCase {
  id: string;
  slug: string;
  title: string;
  description: string;
  marketplace: 'wb' | 'ozon';
  role: UserRole;
  penaltyAmount: number;
  recoveredAmount?: number;
  status: DisputeStatus;
  date: string;
  clause: string; // Пункт оферты или статья закона (например, ст. 14.69 КоАП РФ)
  lawReference?: string; // Ссылка на ФЗ № 289-ФЗ / 295-ФЗ / КоАП РФ
  solutionSteps: string[];
  documentsRequired: string[];
  templateDownloadUrl?: string; // Ссылка на скачивание шаблона претензии (.docx)
  viewsCount: number;
  commentsCount: number;
}