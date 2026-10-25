export type Marketplace = 'wb' | 'ozon' | 'all';

export type UserRole = 'seller' | 'pvz' | 'warehouse' | 'job_worker' | 'courier_darkstore';

// Народный вердикт от участников форума
export type CommunityVerdict = 'can_dispute' | 'hard_case' | 'useless' | 'needs_advice';

export interface ForumTopic {
  id: string;
  slug: string;
  authorTag: string; // Например: @ivan_fbo, Анонимный сборщик, ПВЗ Казань
  marketplace: 'wb' | 'ozon';
  role: UserRole;
  title: string;
  situation: string; // Описание своими словами, как в предложке
  penaltyAmount: number;
  date: string;
  verdict: CommunityVerdict;
  upvotesUnfair: number; // «Беспредел площадки»
  upvotesFair: number;   // «Сам виноват / по делу»
  answersCount: number;  // Количество комментариев с советами
  hasProofImage?: boolean; // Есть ли прикрепленный скриншот удержания
  topAdvicePreview?: string; // Самый залайканный совет из ветки
}