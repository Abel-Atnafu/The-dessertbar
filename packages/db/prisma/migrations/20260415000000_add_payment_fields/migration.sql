-- AlterTable: add paymentMethod and paymentReference to Order
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentReference" TEXT;
