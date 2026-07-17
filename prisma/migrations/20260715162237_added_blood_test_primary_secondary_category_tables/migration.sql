-- AlterTable
ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- CreateTable
CREATE TABLE "primary_category" (
    "id" UUID NOT NULL DEFAULT pg_catalog.gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "primary_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secondary_category" (
    "id" UUID NOT NULL DEFAULT pg_catalog.gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'General',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "secondary_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_test" (
    "id" UUID NOT NULL DEFAULT pg_catalog.gen_random_uuid(),
    "name" TEXT NOT NULL,
    "originalPrice" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2) NOT NULL,
    "discountedPrice" DECIMAL(10,2) NOT NULL,
    "isFastingRequired" BOOLEAN NOT NULL DEFAULT false,
    "primaryCategoryId" UUID NOT NULL,
    "secondaryCategoryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood_test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blood_test_name_key" ON "blood_test"("name");

-- CreateIndex
CREATE INDEX "blood_test_name_idx" ON "blood_test"("name");

-- AddForeignKey
ALTER TABLE "blood_test" ADD CONSTRAINT "blood_test_primaryCategoryId_fkey" FOREIGN KEY ("primaryCategoryId") REFERENCES "primary_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_test" ADD CONSTRAINT "blood_test_secondaryCategoryId_fkey" FOREIGN KEY ("secondaryCategoryId") REFERENCES "secondary_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
