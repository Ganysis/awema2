'use client';

import { useEffect, useState } from 'react';

export default function TestClientsPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text(); // Get raw text first
      })
      .then(text => {
        console.log('Raw response:', text);
        try {
          const data = JSON.parse(text);
          setData(data);
        } catch (e: any) {
          console.error('JSON parse error:', e);
          setError(`JSON parse error: ${e.message}\nRaw response: ${text}`);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test API Clients</h1>
      
      {loading && <p>Chargement...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Erreur: {error}
        </div>
      )}
      
      {data && (
        <div>
          <div className="mb-4 p-4 bg-gray-100 rounded">
            <p><strong>Success:</strong> {data.success ? 'true' : 'false'}</p>
            <p><strong>Nombre de clients:</strong> {data.data?.length || 0}</p>
          </div>
          
          <pre className="bg-gray-900 text-white p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8">
        <a href="/dashboard" className="text-blue-600 hover:underline">
          ← Retour au dashboard
        </a>
      </div>
    </div>
  );
}