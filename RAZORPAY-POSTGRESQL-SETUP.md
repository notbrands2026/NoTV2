# NoT Stage 4 — PostgreSQL + Prisma + Razorpay

Production flow:

Customer → Cart → Checkout → Razorpay → Payment verification → Order → PostgreSQL → /admin

Required Vercel environment variables:

- DATABASE_URL
- NEXT_PUBLIC_SITE_URL
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- RAZORPAY_WEBHOOK_SECRET
- ADMIN_TOKEN

Database setup is automatic on deployment through the included initial migration.

Vercel build command (already configured in `package.json`):

npm run build

Never commit Razorpay secrets or DATABASE_URL to GitHub.
