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
```bash
cd server
cp .env.example .env # or create .env
npm i
npx prisma migrate dev
npx prisma db seed
npm run dev
