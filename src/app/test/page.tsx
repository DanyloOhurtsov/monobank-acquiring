"use client";

import React, { useState } from "react";

const TestPage = () => {
  const [amount, setAmount] = useState<number>(100);
  const [reference, setReference] = useState<string>("Order123");
  const [destination, setDestination] = useState<string>(
    "Payment for services"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/monobank/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100,
          reference,
          destination,
          redirectUrl: "http://localhost:3000/success",
          webHookUrl: "http://localhost:3000/api/monobank/webhook",
          basketOrder: [
            {
              name: "Service A",
              qty: 1,
              sum: amount * 100,
              total: amount * 100,
              code: "service-a",
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.pageUrl;
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-xl font-bold mb-4">Monobank Payment</h1>
        <div className="mb-4">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label>Reference:</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default TestPage;
