# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend (Python / Flask)
```bash
pipenv run start        # Flask dev server on port 3001
pipenv run migrate      # Generate a new migration after model changes
pipenv run upgrade      # Apply pending migrations to the DB
pipenv run downgrade    # Rollback last migration
pipenv run reset_db     # Full migration reset (destructive)
```

### Frontend (React / Webpack)
```bash
npm start               # Webpack dev server on port 3000
npm run build           # Production bundle → /public/
```

### Required `.env` variables
Copy `.env.example` to `.env` and fill in:
```
DATABASE_URL=postgres://...
FLASK_APP=src/app.py
FLASK_DEBUG=1
BACKEND_URL=http://localhost:3001/
BASENAME=/
# Firebase (optional, for image upload)
API_KEY=...  AUTH_DOMAIN=...  PROJECT_ID=...  STORAGE_BUCKET=...
# Amadeus API (for activity recommendations)
AMADEUS_CLIENT_ID=...  AMADEUS_CLIENT_SECRET=...
# SMTP (for invitation emails)
SMTP_USERNAME=...  SMTP_PASSWORD=...  SMTP_HOST=...  SMTP_PORT=...
```

Without `DATABASE_URL`, the backend falls back to SQLite at `/tmp/test.db`.

---

## Architecture

### Monorepo layout
```
src/
  app.py          # Flask app factory — registers blueprint, JWT, CORS, DB
  wsgi.py         # Gunicorn entry point
  api/
    models.py     # SQLAlchemy models
    routes.py     # All REST endpoints (Blueprint `api`, prefix /api)
    admin.py      # Flask-Admin panel (/admin)
    commands.py   # Custom Flask CLI commands
  front/
    js/
      layout.js           # React Router root + global context injection
      store/
        appContext.js      # React Context provider (HOC `injectContext`)
        flux.js            # Global store + all actions (Flux pattern)
      pages/              # Route-level components
      component/          # Shared UI components
    styles/               # Per-component CSS files
public/                   # Webpack build output — served by Flask in production
```

### Backend
- **Entry point**: `src/app.py` creates the Flask app, initialises DB, JWT (`flask-jwt-extended`), CORS, Flask-Admin, and registers the `api` Blueprint.
- **Single blueprint**: all API routes live in `src/api/routes.py` under `/api/*`.
- **Auth**: JWT tokens are issued on `/api/login` and `/api/register`. Protected routes use `@jwt_required()`. The JWT identity is the user's email string.
- **Passwords**: bcrypt with a cost factor of 14; the salt is stored separately in the `users` table.
- **In production**: Flask serves the Webpack-built `public/index.html` for all non-API routes (SPA fallback).

### Frontend state management
The app uses a **custom Flux pattern** — no Redux. The single source of truth lives in `src/front/js/store/flux.js` (`getState` function), which defines `store` (state shape) and `actions` (all async/sync operations). `appContext.js` wraps the root component with a React Context provider via the `injectContext` HOC. Components access state with `useContext(Context)` and destructure `{ store, actions }`.

The JWT token is persisted in `localStorage` and re-hydrated into `store.token` on page load. `getUserLogged()` is called on mount to restore the authenticated user.

### External APIs used
- **Amadeus** (`test.api.amadeus.com`): city geolocation and nearby activity recommendations.
- **Firebase**: image/file storage (credentials injected via env vars).
- **Cloudinary**: alternative media upload (backend-side).
- **SMTP**: trip invitation emails via `smtplib`.

### Data model relationships
```
User ──< Viaje ──< Actividad ──< Comentarios
                              └─< Likes
     └──< Grupo (trip members, linked to Viaje)
```
All models expose a `.serialize()` method returning a plain dict for JSON responses.

### Deployment (Render)
`render_build.sh` runs on every deploy: `npm install && npm run build` then `pipenv install && pipenv run upgrade`. The start command is `gunicorn wsgi --chdir ./src/`. Configuration is in `render.yaml`.
