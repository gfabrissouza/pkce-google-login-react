  export function generateCodeVerifier(length = 128): string {
    // length = 128 é o tamanho recomendado
    // char tem os caracteres permitidos: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
    // o loop gera a string temporária de alta entropia
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const charCount = chars.length;
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
  
    let verifier = '';
    for (let i = 0; i < length; i++) {
      verifier += chars[randomValues[i] % charCount];
    }
    return verifier;
  }
  
  export async function generateCodeChallenge(verifier: string): Promise<string> {
    // o código verificador é criptografado com SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const base64 = arrayBufferToBase64Url(digest);
    return base64;
  }
  
  function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  