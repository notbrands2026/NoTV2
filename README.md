# NoT — Need of Time · Stage 3

Stage 3 ecommerce foundation for Vercel/Next.js.

## Included
- NoT logo and branded storefront
- Product search and category filtering
- Persistent cart using browser storage
- Checkout page with delivery details
- Order confirmation page with order number
- Responsive mobile layout
- Payment-provider integration points (Stripe/Razorpay) via environment variables

## Run locally
```bash
npm install
npm run dev
```

## Production payments
The checkout flow intentionally does **not** collect card details. To accept live payments, connect Stripe or Razorpay and add the provider credentials from `.env.example` to Vercel Project Settings → Environment Variables, then implement the provider's server-side checkout/session endpoint.

## Deploy
Import the repository into Vercel or connect it through GitHub. Vercel detects Next.js automatically.
