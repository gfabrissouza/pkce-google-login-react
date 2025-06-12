
# 🔐 Google Login with PKCE Flow in React

This project demonstrates a **secure and modern implementation of Google OAuth 2.0 login using the Authorization Code Flow with PKCE**, entirely built in React + TypeScript and Vite. It focuses on secure authentication best practices for SPAs without exposing tokens to the frontend.

> ✅ Ideal for developers who want to integrate OAuth login **without a backend** for token exchange.

---

## 🚀 What’s Inside

- ✅ **Google OAuth 2.0 Login** with Authorization Code + PKCE flow
- ✅ No backend — handled entirely in the browser
- ✅ Secure **code verifier/challenge** implementation
- ✅ Seamless redirect and callback flow
- ✅ Simple and minimal **React + Vite + TypeScript** setup
- ✅ Fully customizable and extensible

---

## 🛠️ Technologies Used

| Tool / Library     | Purpose                              |
|--------------------|--------------------------------------|
| React + TypeScript | SPA development                      |
| Vite               | Fast dev server and build tool       |
| Google Identity    | OAuth 2.0 login and user info        |
| PKCE (RFC 7636)    | Secure client-side token exchange    |
| Axios (optional)   | API calls with tokens (e.g., to Google) |

---

## 🔐 OAuth PKCE Flow Explained

This project implements the full OAuth 2.0 Authorization Code Flow with PKCE (Proof Key for Code Exchange), which includes:

1. **Code Verifier & Challenge** generated client-side
2. **Redirect to Google** for user authentication
3. **Authorization Code** returned via redirect URI
4. **Token exchange** done in the browser (no client secret)
5. **User info** fetched securely using the access token

✅ No access or refresh tokens are stored in `localStorage` or `sessionStorage`  
✅ No need for an intermediate backend  
✅ Tokens are kept in memory for runtime use only

---

## 📁 Project Structure

```
src/
├── App.tsx           # Main app logic with login/logout flow
├── Callback.tsx      # Handles redirect URI callback
├── auth.ts           # Auth-related functions and token management
├── pkce.ts           # Code verifier/challenge generator
├── index.css
├── main.tsx
├── vite-env.d.ts
```

---

## 🌐 How to Use Locally

### 1. Create a Google OAuth Client

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new OAuth 2.0 client under "Credentials"
- Choose **Web Application**
- Add `http://localhost:5173/callback` as an authorized redirect URI

### 2. Configure `.env` File

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_REDIRECT_URI=http://localhost:5173/callback
```

### 3. Run the App

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 Learning Goals

This project is a showcase to deepen and demonstrate knowledge of:

- ✅ OAuth 2.0 fundamentals and security
- ✅ PKCE flow implementation without backend
- ✅ React hooks and routing (`react-router-dom`)
- ✅ Environment configuration and secrets in Vite
- ✅ Best practices for secure token handling in frontend-only apps

---

## ⚠️ Security Notes

- This is a **frontend-only** demo — in production apps, consider server-side token handling for better control and refresh token management.
- Tokens are **not persisted**, which is ideal for short-lived sessions but may require re-login after refresh.

---

## 🧠 Concepts You Will Learn

- PKCE code challenge/verification
- Safe OAuth flows in SPAs
- React SPA routing and callbacks
- Secure session handling without localStorage
- Working with Google APIs

---

## 📄 License

MIT License

---

## 👤 Author

**Guilherme Fabris**  
[GitHub](https://github.com/gfabrissouza)
