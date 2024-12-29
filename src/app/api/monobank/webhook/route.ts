
import { handleWebhook } from "@/lib/utils/monobank/webhook-handler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Webhook endpoint hit");
  try {
    console.log("Headers:", req.headers);
    const body = await req.json();
    console.log("Body:", body);

    // Обробляємо payload із webhook
    await handleWebhook(body);

    return NextResponse.json({ status: "Webhook received" });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
