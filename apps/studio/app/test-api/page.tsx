'use client';

import { useState, useEffect } from 'react';

export default function TestApiPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => {
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        return res.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">API Response:</h2>
          <pre className="overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      
      <div className="mt-4">
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}