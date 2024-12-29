import { handleWebhook } from "@/lib/utils/monobank/webhook-handler";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Webhook endpoint hit");
  try {
    console.log("Headers:", req.headers);
    const body = await req.json();
    console.log("Body:", body);

    // Обробляємо payload із webhook
    const data = await handleWebhook(body);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
