-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- CreateTable
CREATE TABLE "EventBooking" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hallId" TEXT NOT NULL,
    "catererId" TEXT,
    "panditId" TEXT,
    "totalAmount" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_catererId_fkey" FOREIGN KEY ("catererId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_panditId_fkey" FOREIGN KEY ("panditId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
