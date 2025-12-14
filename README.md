# Turno - Multi-Brand Vehicle Store (Full Stack)

## Stack
- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: React (Vite), React Router, React Query, Tailwind CSS

## Features
- Vehicle catalog with filters + pagination (Load More)
- Vehicle details with booking form
- Bookmarks (wishlist): add/remove
- Inventory summary dashboard (brand + fuel counts)
- Admin: add vehicle (token protected)
- Safe delete vehicle (cannot delete if bookings exist; bookmarks cleaned up atomically)

## Local Setup

### Backend

1. `cd server`
2. `cp .env.example .env` # or create .env
3. `npm i`
4. `npx prisma migrate dev`
5. `npx prisma db seed`
6. `npm run dev`

### Frontend
1. `cd client`
2. `cp .env.example .env` # or create .env
3. `npm i`
4. `npm run dev`
