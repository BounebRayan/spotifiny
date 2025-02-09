"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Plans() {
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/keys/check-stock`);
        const result = await response.json();
        setStock(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching stock:", error);
      }
    };

    fetchKey();
  }, []);

  const reserveKeys = async (number: number) => {
    try {
      const response = await fetch(`/api/keys/reserve-keys?number=${number}`);
      const result = await response.json();
      console.log("Reserved keys:", result);}
    catch (error) {
      console.error("Error reserving keys:", error);
    }
  }

  const initiatePayment = async (price: number, keysNumber: number ) => {
    const recheckStock = await fetch(`/api/keys/check-stock`);
    const stockResult = await recheckStock.json();
    if (stockResult < keysNumber) {
    alert("Stock épuisé depuis le dernier rafraîchissement!");
    window.location.reload();
    return;
  }
  reserveKeys(keysNumber);

    const url = "https://api.preprod.konnect.network/api/v2/payments/init-payment";
    const data = {
      receiverWalletId: "67a4bc9d5d9b58f3adf20287",
      token: "TND",
      amount: price,
      type: "immediate",
      description: "Payment for spotifini",
      acceptedPaymentMethods: ["bank_card", "e-DINAR"],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: false,
      webhook: "http://localhost:3000/payment",
      silentWebhook: false,
      theme: "dark",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "67a4bc9d5d9b58f3adf2027f:Okuy9aHGMZ3BiMLrUmHmZAiARWFnXEr",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Payment initiated successfully:", result);
        if (result.payUrl) {
          window.location.href = result.payUrl;
        }
      } else {
        console.log("Error initiating payment:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div 
    className="md:pt-6 md:px-12 px-8 bg-black text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
    <section id="pricing">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-400 mb-8 mt-2">
          Arrêtez de vous soucier chaque mois du coût de Spotify. <br /> Avec un seul paiement, obtenez Premium à vie.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {/* Solo Plan */}
          <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold">Solo</h3>
            <p>----------</p>
            <p className="text-4xl font-bold mb-6">30 DT</p>
            <ul className="text-left mb-6 space-y-3">
              <li>1 Clé</li>
              <li>Remplacements illimités</li>
              <li>Spotify Premium à vie</li>
            </ul>
            <button
              onClick={() => initiatePayment(30000, 1)}
              disabled={stock === null || stock <= 0}
              className={`w-full py-2 font-semibold rounded-lg transition-colors ${
                stock && stock > 0 ? "bg-green-500 text-black hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? 'Loading' : stock && stock > 0 ? 'Achetter' : 'Stock épuisé'}
            </button>
          </div>
  
          {/* Duo Plan */}
          <div className="relative bg-black border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all sm:scale-105 sm:hover:scale-110 hover:scale-105 duration-300">
            <div className="absolute -rotate-45 top-9 left-2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-t-green-500">
              <span className="text-white text-xs left-1/2 transform -translate-x-1/2 -translate-y-1/2">Popular</span>
            </div>
            <h3 className="text-2xl font-semibold">Duo</h3>
            <p>----------</p>
            <p className="text-4xl font-bold mb-6">50 DT</p>
            <ul className="text-left mb-6 space-y-3">
              <li>2 Clés</li>
              <li>Remplacements illimités</li>
              <li>Spotify Premium à vie</li>
            </ul>
            <button
              onClick={() => initiatePayment(50000 , 2)}
              disabled={stock === null || stock <= 1}
              className={`w-full py-2 font-semibold rounded-lg transition-colors ${
                stock && stock > 1 ? "bg-green-500 text-black hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? 'Loading' :  stock && stock > 1 ? 'Achetter' : 'Stock épuisé'}
            </button>
          </div>

          {/* Family Plan */}
          <div className="bg-black border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold">Famille</h3>
            <p>----------</p>
            <p className="text-4xl font-bold mb-6">90 DT</p>
            <ul className="text-left mb-6 space-y-3">
              <li>4 Clés</li>
              <li>Remplacements illimités</li>
              <li>Spotify Premium à vie</li>
            </ul>
            <button
              onClick={() => initiatePayment(90000 , 4)}
              disabled={stock === null || stock <= 3}
              className={`w-full py-2 font-semibold rounded-lg transition-colors ${
                stock && stock > 3 ? "bg-green-500 text-black hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              { loading ? 'Loading' :  stock && stock > 3 ? 'Achetter' : 'Stock épuisé'}
            </button>
          </div>
        </div>
      </div>
    </section>
    </motion.div>
  );
}
