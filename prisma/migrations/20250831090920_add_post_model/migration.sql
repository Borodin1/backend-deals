-- CreateTable
CREATE TABLE "public"."Deal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dhs" INTEGER NOT NULL,
    "yield" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "tiket" INTEGER NOT NULL,
    "daysLeft" TEXT NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);
