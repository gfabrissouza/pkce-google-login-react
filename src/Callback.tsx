import { useEffect, useState } from 'react';
import { exchangeCodeForToken } from './auth';

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4 !== 0) {
    str += '=';
  }
  return atob(str);
}

function Callback() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) {
      exchangeCodeForToken(code, state)
        .then(data => {
          console.log('Token response:', JSON.stringify(data, null, 2));

          if (data.id_token) {
            sessionStorage.setItem('id_token', data.id_token);

            const payload = JSON.parse(base64UrlDecode(data.id_token.split('.')[1]));
            console.log(payload);

            setProfile(payload);          
          } else {
            console.error('ID Token missing in response', data);
          }
        })
        .catch(err => {
          console.log('Error exchanging code for token:', err);
        });
    }
  }, []);

  if (!profile) return <p>Carregando...</p>;

  return (
    <div className="p-10 text-center">
      <h2>Bem-vindo, {profile.name}</h2>
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

export default Callback;
