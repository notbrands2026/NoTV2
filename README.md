# NoT — Need of Time · Stage 4

Stage 4 adds a production ecommerce foundation: PostgreSQL order storage with Prisma, Razorpay and Stripe payment checkout, signed-provider webhooks, an admin order view, and an account foundation.

## Deploy to Vercel

1. Push this project to GitHub.
2. In Vercel, connect the repository and use `main` as production.
3. Add the variables from `.env.example` in **Settings → Environment Variables**.
4. Create a PostgreSQL database (Supabase, Neon, or Vercel Postgres) and set `DATABASE_URL`.
5. Run `npx prisma db push` locally against that database, or run the equivalent SQL/schema migration from `prisma/schema.prisma`.
6. Configure Razorpay or Stripe webhooks:
   - Razorpay: `https://notbrands2026.vercel.app/api/webhooks/razorpay`
   - Stripe: `https://notbrands2026.vercel.app/api/webhooks/stripe`
7. Redeploy after environment variables are added.

## Admin
Open `/admin` and enter the `ADMIN_TOKEN` value. The dashboard reads orders from PostgreSQL.

## Notes
Live payments require merchant accounts and credentials. Never commit `.env` files or secret keys to GitHub.
