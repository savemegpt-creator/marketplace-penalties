export type Marketplace = 'wb' | 'ozon' | 'all';

export type UserRole = 'pvz' | 'seller' | 'warehouse' | 'courier';

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
  clause: string; // пункт оферты или регламента
  solutionSteps: string[];
  documentsRequired: string[];
  viewsCount: number;
  commentsCount: number;
}