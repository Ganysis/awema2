'use client';

import { TemplateProposalManagerSimple } from '@/components/admin/template-proposal-manager-simple';

export default function AdminProposalsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestion des propositions de templates</h1>
        <p className="text-gray-600 mt-2">
          Analysez et personnalisez les propositions avant de les envoyer aux clients
        </p>
      </div>

      <TemplateProposalManagerSimple />
    </div>
  );
}