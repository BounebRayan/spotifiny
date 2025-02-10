"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GoInfo } from "react-icons/go";

export default function KeyInfo() {
  const [key, setKey] = useState("");
  interface KeyInfoType {
    status: string;
    username: string;
    verify_address: string;
    used: boolean;
    purchase_date: string;
    used_date: string;
    message?: string;
  }

  const [info, setInfo] = useState<KeyInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchKeyInfo = async () => {
    setLoading(true);
    setError("");
    setInfo(null);

    try {
      const response = await fetch(`/api/key-info?key=${key}`); // Add the API URL here
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur inconnue");
      
      setInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
    className="pb-16 md:pt-12 md:px-24  text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
    <div className="flex flex-col max-w-xl items-center rounded-md  mx-auto text-white py-14 md:px-24 px-8">
      <div>
      <GoInfo className="text-5xl text-green-500 mx-auto mb-4"/>
        <h2 className="text-4xl font-semibold mb-4 text-center">Obtenir les infos de la clé</h2>
        <div className="w-1/2 mx-auto border-t border-gray-600 mb-6"></div>

        {/* Input Field */}
        <label htmlFor="key" className="font-semibold mb-1 block text-sm">Clé</label>
        <input
          type="text"
          name="key"
          id="key"
          placeholder="Entrez votre clé ici"
          value={key}
          autoComplete="on"
          onChange={(e) => setKey(e.target.value)}
          required
          className="w-full p-2.5 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-whitetransition"
        />

        {/* Button */}
        <button
          onClick={fetchKeyInfo}
          disabled={!key || loading}
          className="w-full mt-4 bg-green-500 text-black font-bold p-3 outline-none hover:bg-green-400 hover:scale-105 duration-300 transition-all rounded-full"
        >
          {loading ? "Chargement..." : "Obtenir les infos"}
        </button>

        {info && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2"
          >
            {info.status != 'success' &&  <p className="text-center">{info.message}</p> } 
            {info.status == "success" && (
            <>
              <h3 className="text-lg font-semibold">Détails de la clé :</h3>
              <p><span className="font-semibold text-green-400">Nom d'utilisateur Spotify :</span> {info.username}</p>
              <p><span className="font-semibold text-green-400">Adresse :</span> {info.verify_address}</p>
              <p><span className="font-semibold text-green-400">Utilisable :</span> {info.used ? "Non" : "Oui"}</p>
              {info.used_date && <p><span className="font-semibold text-green-400">Dernière utilisation :</span> {info.used_date}</p>}
            </>
)}

          </motion.div>
        )}
      </div>
    </div>
    </motion.div>
  );
}
