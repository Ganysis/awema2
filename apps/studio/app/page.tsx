'use client';

import { EditorWithSave } from '@/components/editor/EditorWithSave';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EditorWrapper() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId') || undefined;
  const isGenerated = searchParams.get('generated') === 'true';
  const template = searchParams.get('template') || undefined;
  const theme = searchParams.get('theme') || undefined;
  
  console.log('EditorWrapper params:', { projectId, isGenerated, template, theme });
  
  return <EditorWithSave 
    projectId={projectId} 
    isGenerated={isGenerated}
    template={template}
    theme={theme}
  />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <EditorWrapper />
    </Suspense>
  );
}