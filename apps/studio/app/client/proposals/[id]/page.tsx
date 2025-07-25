'use client';

import { TemplateProposalViewerSimple } from '@/components/client/template-proposal-viewer-simple';

export default function ClientProposalPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TemplateProposalViewerSimple proposalId={params.id} />
    </div>
  );
}