import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { MOCK_TOPICS } from '@/data/penalties';
import CaseContent from '@/components/CaseContent';

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_TOPICS.map((topic) => ({
    slug: topic.slug,
  }));
}

async function CaseLoader({ params }: CasePageProps) {
  const { slug } = await params;
  const topic = MOCK_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return <CaseContent topic={topic} />;
}

export default function CasePage({ params }: CasePageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-8 text-center text-xs text-slate-400">Загрузка кейса...</div>}>
      <CaseLoader params={params} />
    </Suspense>
  );
}