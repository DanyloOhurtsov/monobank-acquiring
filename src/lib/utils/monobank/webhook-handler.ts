interface WebhookPayload {
  invoiceId: string;
  status: string;
  amount: number;
  modifiedDate: number;
}

export const handleWebhook = async (payload: WebhookPayload) => {
  // Додайте свою бізнес-логіку тут
  console.log("Webhook received:", payload);

  if (payload.status === "success") {
    // Обробка успішної оплати

    console.log("Payment successful:", payload.invoiceId);
    return { status: "success HandleWebhook" };
  } else {
    console.log("Payment status:", payload.status);
    return { status: "error HandleWebhook" };
  }
};
