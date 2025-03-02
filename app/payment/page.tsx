"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const SuccessPageContent = () => {
  const searchParams = useSearchParams(); 
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [purchasedKeys, setPurchasedKeys] = useState<string[]>([]);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const paymentRef = searchParams.get('payment_ref');
    if (paymentRef) {
      fetchPaymentStatus(paymentRef);
    }
  }, [searchParams]);

  const fetchKeys = async (paymentRef: string, email: string, amount: string) => {
    const url = `/api/order?paymentId=${paymentRef}&amount=${amount}&email=${email}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.keys && result.keys.length > 0) {
        setPurchasedKeys(result.keys.map((keyObj: { key: string }) => keyObj.key));
        determinePlan(amount);
       //sendKeysByMail(email, result.keys.map((keyObj: { key: string }) => keyObj.key).join(', '));
      } else {
        setPaymentStatus("Aucune clé disponible pour cet achat.");
      }
    } catch (error) {
      console.error('Error fetching keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendKeysByMail = async ( email: string, keys: string) => {
    const url = `/api/send-keys-by-email`;
    try {
       await fetch(url, {method: 'POST', body: JSON.stringify({email, key: keys})});
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const determinePlan = (amount: string) => {
    if (amount === "40000") setPlan("Solo");
    else if (amount === "60000") setPlan("Duo");
    else setPlan("Family");
  };

  const fetchPaymentStatus = async (paymentRef: string) => {
    const baseurl= process.env.NEXT_PUBLIC_PAYMENT_URL;
    const url = `${baseurl}/${paymentRef}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': '67a4bc9d5d9b58f3adf2027f:Okuy9aHGMZ3BiMLrUmHmZAiARWFnXEr',
        },
      });

      const result = await response.json();
      if (response.ok && result.payment.transactions[0].status === 'success') {
        const email = result.payment.transactions[0].extSenderInfo.email;
        const amount = result.payment.transactions[0].amount.toString();
        setPaymentStatus("Paiement effectué avec succès!");
        fetchKeys(paymentRef, email, amount);
        setPaymentSuccess(true);
      } else {
        setPaymentStatus("Le paiement a échoué. Veuillez réessayer.");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
      setPaymentStatus("Une erreur s'est produite lors du traitement du paiement. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="pb-16 md:pt-16 py-14 md:px-24 px-8 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center  text-white">
        <div className="max-w-lg mx-auto text-center">
          
          {loading ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg">Chargement en cours...</p>
            </motion.div>
          ) : (
            <>
              {paymentSuccess ? <FaCheck className="text-5xl text-green-500 mx-auto mb-4" /> : <FaTimes className="text-5xl text-red-500 mx-auto mb-4" />}
              <h1 className={`text-4xl font-bold ${paymentSuccess ? 'text-green-500': 'text-red-500'} mb-4`}>{paymentStatus}</h1>
              <div className="w-1/2 mx-auto border-t border-gray-600 mb-6"></div>

              {purchasedKeys.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl text-white">
                    {plan === "Solo" && "Voici votre clé, conservez-la car vous ne la reverrez plus :"}
                    {plan === "Duo" && "Voici vos clés, partagez-en un avec un ami en toute sécurité :"}
                    {plan === "Family" && "Voici vos clés pour toute la famille, conservez-les bien :"}
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {purchasedKeys.map((key, index) => (
                      <li key={index} className="text-2xl font-semibold bg-gray-800 p-2 rounded-md">
                        {key}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-green-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:bg-green-400"
                >
                  Retour à l'accueil
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </motion.div>
  );
};

// Wrap in Suspense for proper hydration
const SuccessPage = () => (
  <Suspense fallback={<div className="text-white">Chargement...</div>}>
    <SuccessPageContent />
  </Suspense>
);

export default SuccessPage;
