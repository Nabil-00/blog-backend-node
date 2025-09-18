# Blog Backend (Node.js + Supabase)

A lightweight backend for a blog platform using Express.js and Supabase (Auth, Database, Storage).

## Features
- Admin authentication via Supabase Auth
- CRUD for posts and comments
- Image upload for posts (Supabase Storage)
- JWT-protected admin routes
- CORS enabled for frontend integration

## Endpoints
- `POST /auth/login` — Admin login, returns JWT
- `POST /posts` — Create post (admin)
- `GET /posts` — List posts
- `POST /comments` — Add comment
- `GET /comments/:post_id` — List comments for a post
- `POST /api/images/upload` — Upload image (admin)

## Setup
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Supabase credentials to `.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   PORT=4000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Frontend Integration
See `FRONTEND_INTEGRATION.md` for CORS and environment details.

---
MIT License
