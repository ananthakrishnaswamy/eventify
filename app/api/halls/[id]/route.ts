import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const availability = await prisma.vendorAvailability.findUnique({
    where: { id },
    include: { vendor: true },
  });

  if (!availability) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(availability);
}

