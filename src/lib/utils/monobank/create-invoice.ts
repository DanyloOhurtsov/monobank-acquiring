import axios from "axios";

const MONOBANK_API_URL = "https://api.monobank.ua/api/merchant/invoice/create";
const MONOBANK_TOKEN = process.env.MONOBANK_TOKEN;
if (!MONOBANK_TOKEN) {
  throw new Error("MONOBANK_TOKEN is not set in the environment variables");
}

interface BasketOrderItem {
  name: string;
  qty: number;
  sum: number;
  total: number;
  code: string;
}

interface CreateInvoicePayload {
  amount: number;
  ccy: number;
  merchantPaymInfo: {
    reference: string;
    destination: string;
    comment: string;
    basketOrder: BasketOrderItem[];
  };
  redirectUrl: string;
  webHookUrl: string;
}

export const createInvoice = async (payload: CreateInvoicePayload) => {
  try {
    const response = await axios.post(MONOBANK_API_URL, payload, {
      headers: {
        "X-Token": MONOBANK_TOKEN,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Monobank API error:", error.response?.data || error.message);
    throw new Error("Failed to create invoice");
  }
};
