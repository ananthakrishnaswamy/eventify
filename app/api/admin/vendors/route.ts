import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    type,
    location,
    basePrice,
    capacity,
    amenities,
    availabilityDates,
  } = body;

  if (!name || !type || !location) {
    return NextResponse.json(
      { error: "name, type, location are required" },
      { status: 400 }
    );
  }

  const vendor = await prisma.vendor.create({
    data: {
      name,
      type,
      location,
      basePrice,
      halls:
        type === "HALL"
          ? {
              create: {
                capacity,
                amenities: amenities || [],
              },
            }
          : undefined,
      availability: availabilityDates
        ? {
            createMany: {
              data: availabilityDates.map((d: string) => ({
                date: new Date(d),
              })),
            },
          }
        : undefined,
    },
  });

  return NextResponse.json(vendor);
}

