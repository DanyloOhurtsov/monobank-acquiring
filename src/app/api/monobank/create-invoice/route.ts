import { createInvoice } from "@/lib/utils/monobank/create-invoice";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      amount,
      ccy = 980,
      reference,
      destination,
      redirectUrl,
      webHookUrl,
      basketOrder,
    } = body;

    if (
      !amount ||
      !reference ||
      !destination ||
      !redirectUrl ||
      !webHookUrl ||
      !basketOrder
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const invoice = await createInvoice({
      amount,
      ccy,
      merchantPaymInfo: {
        reference,
        destination,
        comment: destination,
        basketOrder,
      },
      redirectUrl,
      webHookUrl,
    });

    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create invoice", details: error},
      { status: 500 }
    );
  }
}
