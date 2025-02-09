'use client';

import { FaSpotify } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SpotifyUpgradeBanner() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="w-full bg-black text-white py-10 md:py-32 px-6 flex flex-col items-center justify-center text-center rounded-2xl shadow-lg "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >
      <FaSpotify className="text-green-500 text-6xl mb-5" />
      <h2 className="text-3xl font-bold">Obtenez Spotify Premium à Vie</h2>
      <p className="text-gray-400 mt-3">Nous croyons que vous ne devriez pas payer des frais mensuels excessifs pour un service simple.<br />Profitez d’un système automatisé conçu pour vous faciliter la vie.</p>
      <div className='mt-6 flex flex-row items-center justify-center space-y-0 space-x-2 md:space-x-4'>
        <button className="border border-green-500 bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300" onClick={scrollToPricing}>
          Acheter une clé
        </button>
        <Link href="/upgrade" className="block border border-green-500 hover:text-green-600 text-green-500 font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300"> 
          Passez à Premium
        </Link>
      </div>
    </motion.div>
  );
}