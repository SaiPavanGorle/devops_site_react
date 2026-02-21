# DevOps Release Portal (Vite + React + TypeScript)

Simple authentication frontend with role-aware dashboard placeholders.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Adjust API endpoint in `.env` if needed:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Routes

- `/login`
- `/signup`
- `/dashboard` (protected)

## Notes

- Uses `react-hook-form` + `zod` for form validation.
- Uses `axios` client with auth interceptor (`Authorization: Bearer <token>`).
- On successful login/signup, saves token and user profile in `localStorage`.
