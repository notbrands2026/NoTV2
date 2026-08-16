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

Vercel build command:

prisma generate && prisma migrate deploy && next build

Never commit Razorpay secrets or DATABASE_URL to GitHub.
