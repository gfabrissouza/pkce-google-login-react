import { useEffect, useState } from 'react';
import { redirectToGoogle, validateIdToken } from './auth';

function App() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('id_token');
    if (savedToken) {
      validateIdToken(savedToken)
        .then(data => {
          setProfile(data);
        })
        .catch(() => {
          sessionStorage.removeItem('id_token'); // remove token inválido
        });
    }
  }, []);

  if (profile) {
    return (
      <div className="p-10 text-center">
      <h2>Bem-vindo de volta, {profile.name}</h2>
      <p>Email: {profile.email}</p>
      {profile.picture && (
        <img
          src={profile.picture}
          alt="Avatar"
          className="mx-auto rounded-full mt-4"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
    </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl mb-4">Login com Google (PKCE)</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={redirectToGoogle}
      >
        Entrar com Google
      </button>
    </div>
  );
}

export default App;
