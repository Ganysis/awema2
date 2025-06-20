'use client';

import { CubeIcon } from '@heroicons/react/24/outline';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] p-8">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <CubeIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Start building your website
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        Drag blocks from the sidebar or click on them to add to your page.
        You can also use templates to get started quickly.
      </p>
      
      <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-md">
        <p className="text-center text-gray-400">
          Drop blocks here
        </p>
      </div>
    </div>
  );
}