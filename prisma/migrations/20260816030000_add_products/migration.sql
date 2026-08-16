CREATE TABLE "Product" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  "tag" TEXT,
  "stock" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

INSERT INTO "Product" ("name", "category", "price", "description", "tag", "stock", "updatedAt") VALUES
('NoT Essential Tee', 'Apparel', 799, 'Everyday heavyweight tee with the NoT identity.', 'New', 25, CURRENT_TIMESTAMP),
('Need of Time Hoodie', 'Apparel', 1499, 'Relaxed-fit hoodie built for everyday comfort.', 'Best Seller', 20, CURRENT_TIMESTAMP),
('NoT Signature Cap', 'Accessories', 599, 'Minimal cap with a clean embroidered mark.', NULL, 30, CURRENT_TIMESTAMP),
('NoT Everyday Tote', 'Accessories', 449, 'Durable carry-all for work, travel and daily use.', NULL, 30, CURRENT_TIMESTAMP),
('Timekeeper Journal', 'Lifestyle', 349, 'A simple premium journal for ideas, plans and notes.', NULL, 40, CURRENT_TIMESTAMP),
('NoT Classic Bottle', 'Lifestyle', 699, 'Reusable bottle with a clean, timeless finish.', NULL, 25, CURRENT_TIMESTAMP);
