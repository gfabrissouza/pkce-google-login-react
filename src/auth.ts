import { generateCodeVerifier, generateCodeChallenge } from './pkce';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const scope = 'openid email profile';

export async function redirectToGoogle() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = crypto.randomUUID();

  sessionStorage.setItem('pkce_verifier', verifier);
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    client_id: clientId,    
    redirect_uri: redirectUri,
    response_type: 'code', 
    scope: scope,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state: state,
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeCodeForToken(code: string, state: string) {
  const verifier = sessionStorage.getItem('pkce_verifier');
  const expectedState = sessionStorage.getItem('oauth_state');

  if (!verifier || !expectedState) throw new Error('Missing PKCE data');

  if (state !== expectedState) throw new Error('Invalid state');

  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('oauth_state');

  const body = new URLSearchParams({
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    code_verifier: verifier,
    client_secret: clientSecret
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  return res.json();
}

export async function validateIdToken(idToken: string) {
  const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`);
  if (!res.ok) throw new Error('Invalid Token');
  return await res.json();
}
