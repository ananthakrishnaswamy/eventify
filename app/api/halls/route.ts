export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json(
      { error: "date query param required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const start = new Date(dateParam);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(dateParam);
  end.setUTCHours(23, 59, 59, 999);

  const halls = await prisma.vendor.findMany({
    where: {
      type: "HALL",
      availability: {
        some: {
          isBooked: false,
          date: {
            gte: start,
            lte: end,
          },
        },
      },
    },
    include: {
      halls: true,
    },
  });

  return NextResponse.json(halls);
}

