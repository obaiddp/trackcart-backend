-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'DRINK', 'DESSERT');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PREPARED', 'READY', 'SERVED', 'PAID');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DINE_IN', 'TAKE_AWAY', 'DELIVERY');

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "category" "Category" NOT NULL DEFAULT 'FOOD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuVariation" (
    "id" SERIAL NOT NULL,
    "size" "Size" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "menuItemId" INTEGER NOT NULL,

    CONSTRAINT "MenuVariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "menuVariationId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'DINE_IN',
    "status" "Status" NOT NULL,
    "priority" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuVariation" ADD CONSTRAINT "MenuVariation_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuVariationId_fkey" FOREIGN KEY ("menuVariationId") REFERENCES "MenuVariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
