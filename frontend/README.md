# StockMaster - Integrated Frontend and Backend

This is a complete Next.js application with both frontend and backend integrated in one folder structure.

## Project Structure

- `/app` - Frontend pages and layouts
  - `/api` - Backend API routes (Next.js API routes)
  - `/auth` - Authentication pages
  - `/dashboard` - Dashboard pages
- `/components` - React components
- `/lib` - Utility functions and API client

## How It Works

In Next.js, the API routes in the `/app/api` folder serve as your backend. These endpoints handle data operations and authentication.

The frontend pages in the `/app` folder and components in the `/components` folder make up your user interface.

The `lib/api.ts` file contains functions that connect your frontend to your backend API routes.

## Getting Started

1. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Login with:
   - Email: umurungiolga12@gmail.com
   - Any password (for demo purposes)
