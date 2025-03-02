"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Plans() {
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<number | null>(null);

  {/* Fetching stock on page render */}
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

  {/* Function to reserve a number of keys */}
  const reserveKeys = async (number: number) => {
    try {
      await fetch(`/api/keys/reserve-keys?number=${number}`);
    }
    catch (error) {
      console.error("Error reserving keys:", error);
    }
  }

  {/* Function to initiate payment */}
  const initiatePayment = async (price: number, keysNumber: number ) => {
    const recheckStock = await fetch(`/api/keys/check-stock`);
    const stockResult = await recheckStock.json();

    if (stockResult < keysNumber) {
      alert("Stock épuisé depuis le dernier rafraîchissement!");
      window.location.reload();
      return;
    }

    reserveKeys(keysNumber);

    const url = process.env.NEXT_PUBLIC_PAYMENT_URL+"/init-payment";
    const data = {
      receiverWalletId: "67a4bc9d5d9b58f3adf20287",
      token: "TND",
      amount: price,
      type: "immediate",
      description: "Payment for The Spotifiny service",
      acceptedPaymentMethods: ["bank_card", "e-DINAR"],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: false,
      webhook: process.env.NEXT_PUBLIC_WEBHOOK_URL,
      silentWebhook: false,
    };

    if (!url) {
      console.error("Payment initiation URL is not defined");
      return;
    }
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
    className="md:pt-6 md:px-12 px-8 text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >

    <section id="pricing">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl font-bold">Choisissez votre offre</h2>
        <p className="text-gray-400 mb-5 mt-2">
        Envoyez-nous un message sur Facebook pour acheter une offre. <br /> Avec un seul paiement, obtenez Premium à vie.
        </p>
        
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 flex overflow-x-auto md:overflow-hidden space-x-6 p-4">
          {/* Solo Plan */}
          <div className="min-w-[250px] sm:w-auto bg-[#1A1A1A] border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold">Solo</h3>
            <p>----------</p>
            <p className="text-4xl font-bold mb-6">40 DT</p>
            <ul className="text-left mb-6 space-y-3">
              <li>1 Clé</li>
              <li>Remplacements illimités</li>
              <li>Spotify Premium à vie</li>
            </ul>
            <button
              onClick={() => /*initiatePayment(40000, 1)*/ window.open("https://www.facebook.com/profile.php?id=61573513723812", "_blank")}
              disabled={stock === null || stock <= 0}
              className={`w-full py-2 font-semibold rounded-full transition-colors ${
                stock && stock > 0 ? "bg-green-500 text-black hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Loading" : stock && stock > 0 ? "Contactez-nous" : "Stock épuisé"}
            </button>
          </div>

          {/* Duo Plan */}
          <div className="min-w-[250px] sm:w-auto relative bg-[#1A1A1A] border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all sm:scale-105 sm:hover:scale-110 hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold">Duo</h3>
            <p>----------</p>
            <p className="text-4xl font-bold mb-6">60 DT</p>
            <ul className="text-left mb-6 space-y-3">
              <li>2 Clés</li>
              <li>Remplacements illimités</li>
              <li>Spotify Premium à vie</li>
            </ul>
            <button
              onClick={() => /*initiatePayment(60000, 2)*/ window.open("https://www.facebook.com/profile.php?id=61573513723812", "_blank")}
              disabled={stock === null || stock <= 1}
              className={`w-full py-2 font-semibold rounded-full transition-colors ${
                stock && stock > 1 ? "bg-green-500 text-black hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Loading" : stock && stock > 1 ? "Contactez-nous" : "Stock épuisé"}
            </button>
          </div>

          {/* Family Plan */}
          <div className="min-w-[250px] sm:w-auto bg-[#1A1A1A] border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold">Famille</h3>
            <p>----------</p>
            <p className="text-4xl font-bold mb-6">90 DT</p>
            <ul className="text-left mb-6 space-y-3">
              <li>4 Clés</li>
              <li>Remplacements illimités</li>
              <li>Spotify Premium à vie</li>
            </ul>
            <button
              onClick={() => /*initiatePayment(90000, 4)*/ window.open("https://www.facebook.com/profile.php?id=61573513723812", "_blank")}
              disabled={stock === null || stock <= 3}
              className={`w-full py-2 font-semibold rounded-full transition-colors ${
                stock && stock > 3 ? "bg-green-500 text-black hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Loading" : stock && stock > 3 ? "Contactez-nous" : "Stock épuisé"}
            </button>
          </div>
        </div>

      </div>
    </section>
    </motion.div>
  );
}
