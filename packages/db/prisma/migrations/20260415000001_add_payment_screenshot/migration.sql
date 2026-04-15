-- AlterTable: add paymentScreenshot to Order (stores base64 image data)
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentScreenshot" TEXT;
