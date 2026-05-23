# Notes App (Hono + Bun)

A REST API backend built with Hono, running locally on Bun. This is a clone of the [Cloudflare Workers version](https://github.com/Nyasper/notes_app_hono_CFworkers) adapted to run entirely on local.

## Features

- User authentication (register/login)
- CRUD endpoints for notes
- Admin endpoints for user management
- Drizzle ORM for database access
- Runs locally with Bun

## Tech Stack

- **Hono** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Bun** - Runtime and package manager

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/notes` | Get all notes for the authenticated user |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |
| GET | `/api/admin/users` | List all users (admin only) |
| DELETE | `/api/admin/users/:id` | Delete a user (admin only) |


## Cloudflare Workers Version

This is the local Bun version. If you want the Cloudflare Workers deployment instead, check out:

**[Nyasper/notes_app_hono_CFworkers](https://github.com/Nyasper/notes_app_hono_CFworkers)**

Same API, same Drizzle ORM setup, but deployed to Cloudflare Workers.

## Related Projects

- [Notes App Backend (Cloudflare Workers)](https://github.com/Nyasper/notes_app_hono_CFworkers) -- the same API deployed on Cloudflare Workers
- [Vue Notes App](https://github.com/Nyasper/vue-notes-app) -- the frontend that consumes this API
