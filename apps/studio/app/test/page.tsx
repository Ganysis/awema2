export default function TestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test Page</h1>
      <p>Le serveur fonctionne !</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}