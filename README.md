# NoT — Need of Time · Stage 4

Stage 4 Admin adds a PostgreSQL-backed product catalogue, secure product and inventory management, order management, Razorpay and Stripe checkout, and signed-provider webhooks.

## Deploy to Vercel

1. Push this project to GitHub.
2. In Vercel, connect the repository and use `main` as production.
3. Add the variables from `.env.example` in **Settings → Environment Variables**.
4. Create a PostgreSQL database (Supabase, Neon, or Vercel Postgres) and set `DATABASE_URL`.
5. Deploy. The included initial Prisma migration automatically creates the `Customer`, `Order`, and `OrderItem` tables during the Vercel build.
6. Configure Razorpay or Stripe webhooks:
   - Razorpay: `https://notbrands2026.vercel.app/api/webhooks/razorpay`
   - Stripe: `https://notbrands2026.vercel.app/api/webhooks/stripe`
7. Redeploy after environment variables are added.

## Admin
Open `/admin` and enter the same `ADMIN_TOKEN` value configured in Vercel. You can add, edit, hide and delete products, set prices and stock, attach an image URL, and review orders. Product changes are stored in PostgreSQL and appear automatically on the storefront and checkout.

For product images, upload the image to a public image host such as Cloudinary, then paste its secure HTTPS URL into **Product image URL**.

## Notes
Live payments require merchant accounts and credentials. Never commit `.env` files or secret keys to GitHub.

The project build script runs `prisma generate` and `prisma migrate deploy` before `next build`. Keep the Vercel Build Command at its default; no dashboard override is required.
